import numpy as np
from urllib.parse import urlparse


def get_source_column(dataframe):
    # add source column
    source_list = []

    for i in range(len(dataframe['url'])):
        # select url string
        url = urlparse(dataframe['url'][i])
        source_names = url.netloc

        source_list.append(source_names)

    dataframe['source'] = source_list
    # result = dataframe.values.tolist()
    # return result
    return dataframe


def get_source_rank(input_df):
    df_source = input_df[['source', 'content_date']].copy()
    source_groups = df_source.groupby('source').count().sort_values(['content_date'], ascending=False)
    source_groups.columns = ['source_frequency']
    source_groups.reset_index(level=0, inplace=True)
    source_groups.index = np.arange(1, len(source_groups) + 1)
    source_groups.to_csv('temp_df.csv')

    return source_groups.values.tolist();
