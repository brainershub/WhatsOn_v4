import pandas as pd
import datetime


def author_growth_graph(results_data_js):
    MAX_NO_TOP_AUTHORS = 5
    df = pd.DataFrame(results_data_js)
    author_groups = df.groupby('author')
    grp = df.groupby('author')
    df_list = []

    # get list of dicts that has dfs for each author with occurance
    for name, group in grp:
        single_author_group = group.groupby('content_date').count().sort_values(['author'], ascending=False)
        single_author_group.reset_index(level=0, inplace=True)
        single_author_group.rename(columns={'author': 'frequency'}, inplace=True)

        # convert the 'Date' column to datetime format
        single_author_group['content_date'] = pd.to_datetime(single_author_group['content_date'])

        # select dates only 1 year old from current date
        import datetime
        date_one_year_ago_from_current_date = pd.Timestamp.utcnow() - pd.Timedelta('365D')
        date_one_year_ago_from_current_date = pd.to_datetime(date_one_year_ago_from_current_date)

        # select days only 1 year old
        single_author_group = single_author_group[
            (single_author_group['content_date'] > date_one_year_ago_from_current_date)]

        single_author_group.sort_values(['content_date'], ascending=True, inplace=True)

        single_author_group['sum'] = single_author_group.frequency.cumsum()

        single_author_group.reset_index(level=0, inplace=True)

        occurance = len(single_author_group)

        single_author_data_dic = {'author': name, 'occurance': occurance,
                                  'content_date_list': single_author_group['content_date'].tolist(),
                                  'frequency_agg_list': single_author_group['sum'].tolist()}
        df_list.append(single_author_data_dic)

    df_list = sorted(df_list, key=lambda k: k['occurance'], reverse=True)

    # choose top 5 authors
    df_dict_list_chosen = []
    if len(df_list) > MAX_NO_TOP_AUTHORS:
        df_dict_list_chosen = df_list[:MAX_NO_TOP_AUTHORS]
    else:
        df_dict_list_chosen = df_list

    return df_dict_list_chosen

