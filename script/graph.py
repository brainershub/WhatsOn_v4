import numpy as np
import pandas as pd


def get_graph_data(input_df):
    # print(input_df)
    message = 'convert_json_to_coordinates_by_content_date'
    df = pd.DataFrame(input_df)
    df_ = df[['text', 'content_date']].groupby(['content_date']).count().reset_index()
    df_['content_date'] = pd.to_datetime(df_['content_date'], errors='coerce')
    df_ = df_.sort_values(by='content_date')
    # print(df_)

    df_filtered = df_
    if df_filtered.empty:
        message = '\n No result for these dates'
    else:
        df_filtered['content_date'] = df_filtered['content_date'].dt.strftime('%m/%d/%Y')

    df_filtered.replace(np.NaN, "No date", inplace=True)
    return {
        'message': message,
        'result': df_filtered.values.tolist()
    }
    # # df_authors = input_df[['author', 'content_date']].copy()
    # # author_groups = df_authors.groupby('author').count().sort_values(['content_date'], ascending=False)
    # # author_groups.columns = ['article_frequency']
    # # author_groups.reset_index(level=0, inplace=True)
    # #
    # # # remove undefined author articles
    # # author_groups.drop(author_groups[(author_groups['author'] == 'undefined')].index, inplace=True)
    # # author_groups.index = np.arange(1, len(author_groups) + 1)
    # #
    # # return author_groups
    # return "graph"
