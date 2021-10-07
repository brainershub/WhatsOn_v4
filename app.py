import os

from flask import Flask, render_template
from flask import request
from flask import jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import and_
from sqlalchemy import or_
import pandas as pd
from flask_cors import CORS, cross_origin

from script.author_ranking import get_author_rank
from script.create_word_cloud import word_cloud
from script.source_ranking import get_source_column, get_source_rank
from script.graph import get_graph_data
from script.author_growth_graph_data import author_growth_graph
from script.source_growth_graph_data import source_growth_graph
from script.visual_graphs import create_graph
app = Flask(__name__)

app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app, support_credentials=True, resources={
     r"/dashboard_filters": {"origins": "*"}})
# app.config.from_object(os.environ.get("APP_SETTINGS"))  # db_connection
app.config[
    'SQLALCHEMY_DATABASE_URI'] = 'postgresql://brainer:uc2fxbrcjxofyqsn@db-postgresql-whatson-do-user-8665663-0.b.db.ondigitalocean.com:25060/defaultdb'
db = SQLAlchemy(app)  # db_connection
dashboard_table = db.Table('test_ferring', db.metadata,
                           autoload=True, autoload_with=db.engine)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/author_growth_graph', methods=['POST'])
@cross_origin(origin='*', headers=['Content-Type'])
def get_author_growth_graph():
    result = request.json
    print(result)
    return jsonify(author_growth_graph(result))


@app.route('/source_growth_graph', methods=['POST'])
@cross_origin(origin='*', headers=['Content-Type'])
def get_source_growth_graph():
    result = request.json
    print(result)
    return jsonify(source_growth_graph(result))


@app.route('/visual_graph', methods=['POST'])
@cross_origin(origin='*', headers=['Content-Type'])
def get_network_graph():
    return create_graph()


@app.route('/dashboard_filter', methods=['POST'])
@cross_origin(origin='*', headers=['Content-Type'])
def filter_dashboard():
    data = request.json

    author = [x.strip().capitalize() for x in data['author'] if x]
    labels = [x.strip() for x in data['labels'] if x]
    date = [x.strip() for x in data['date'] if x]
    pos_words = [x.strip() for x in data['pos_words'] if x]
    neg_words = [x.strip() for x in data['neg_words'] if x]
    

    results = []
    if len(date) == 2:
        results = db.session.query(dashboard_table).filter(
            and_(and_(or_(*[dashboard_table.c.author.contains(author_data)
                            for author_data in author]),
                      or_(*[dashboard_table.c.labels.contains(label_data)
                            for label_data in labels])),
                 and_(and_(*[dashboard_table.c.text.contains(pos_word.lower())
                             for pos_word in pos_words]),
                      and_(*[~dashboard_table.c.text.contains(neg_word.lower())
                             for neg_word in neg_words])),
                 dashboard_table.c.content_date.between(date[0], date[1])))
    elif len(date) == 0:
        results = db.session.query(dashboard_table).filter(
            and_(and_(or_(*[dashboard_table.c.author.contains(author_data)
                            for author_data in author]),
                      or_(*[dashboard_table.c.labels.contains(label_data)
                            for label_data in labels])),
                 and_(and_(*[dashboard_table.c.text.contains(pos_word.lower())
                             for pos_word in pos_words]),
                      and_(*[~dashboard_table.c.text.contains(neg_word.lower())
                             for neg_word in neg_words]))))

    filtered_data = []
    all_data = []
    source_ranking_data = []
    author_ranking_data = []
    graph_data = []
    word_cloud = []

    for d in results:
        filtered_data.append({"id": d.id, "title": d.title, "author": d.author, "text": d.text,
                              "content_date": d.content_date, "url": d.url, "url_base": d.url_base,
                              "summary": d.summary, "wordcount": d.wordcount, "labels": d.labels})
        #print(d.url_base)

    if len(filtered_data) != 0:
        source_ranking_data = get_source_ranking(filtered_data)
        author_ranking_data = get_author_ranking(filtered_data)
        word_cloud = get_wordcloud(filtered_data)
        graph_data = get_graph_data(filtered_data)

    all_data.append({"result": filtered_data, "source_ranking": source_ranking_data,
                     "author_ranking": author_ranking_data, "graph_data": graph_data, "word_cloud": word_cloud})

    return jsonify(all_data)


def get_source_ranking(data):
    df = pd.DataFrame(data)
    df_updated = get_source_column(df)
    df_source_ranking = get_source_rank(df_updated)

    return df_source_ranking


def get_author_ranking(data):
    df = pd.DataFrame(data)
    df_updated = get_author_rank(df)

    return df_updated


def get_wordcloud(data):
    return word_cloud(data)


if __name__ == '__main__':
    app.run()
