import pandas as pd
import datetime


def source_growth_graph(results_data_js):
    MAX_NO_TOP_SOURCES = 5
    df = pd.DataFrame(results_data_js)
    grp = df.groupby('url_base')
    df_list = []

    # get list of dicts that has dfs for each source with occurance
    for name, group in grp:
        single_source_group = group.groupby('content_date').count().sort_values(['url_base'], ascending=False)
        single_source_group.reset_index(level=0, inplace=True)
        single_source_group.rename(columns={'url_base': 'frequency'}, inplace=True)

        # convert the 'Date' column to datetime format
        single_source_group['content_date'] = pd.to_datetime(single_source_group['content_date'])

        # select dates only 1 year old from current date
        import datetime
        date_one_year_ago_from_current_date = pd.Timestamp.utcnow() - pd.Timedelta('365D')
        date_one_year_ago_from_current_date = pd.to_datetime(date_one_year_ago_from_current_date)

        # select days only 1 year old
        single_source_group = single_source_group[
            (single_source_group['content_date'] > date_one_year_ago_from_current_date)]

        single_source_group.sort_values(['content_date'], ascending=True, inplace=True)

        single_source_group['sum'] = single_source_group.frequency.cumsum()

        single_source_group.reset_index(level=0, inplace=True)

        occurance = len(single_source_group)

        single_source_data_dic = {'source': name, 'occurance': occurance,
                                  'content_date_list': single_source_group['content_date'].tolist(),
                                  'frequency_agg_list': single_source_group['sum'].tolist()}
        df_list.append(single_source_data_dic)

    df_list = sorted(df_list, key=lambda k: k['occurance'], reverse=True)

    # choose top 5 sources
    df_dict_list_chosen = []
    if len(df_list) > MAX_NO_TOP_SOURCES:
        df_dict_list_chosen = df_list[:MAX_NO_TOP_SOURCES]
    else:
        df_dict_list_chosen = df_list

    return df_dict_list_chosen