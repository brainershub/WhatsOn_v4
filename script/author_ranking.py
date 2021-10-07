import numpy as np


def get_author_rank(input_df):
    df_authors = input_df[['author', 'content_date']].copy()
    author_groups = df_authors.groupby('author').count().sort_values(['content_date'], ascending=False)
    author_groups.columns = ['article_frequency']
    author_groups.reset_index(level=0, inplace=True)

    # remove undefined author articles
    author_groups.drop(author_groups[(author_groups['author'] == 'undefined')].index, inplace=True)
    author_groups.index = np.arange(1, len(author_groups) + 1)

    result=author_groups.values.tolist()
    return result
    # return author_groups
