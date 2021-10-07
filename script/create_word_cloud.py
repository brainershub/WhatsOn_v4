# import os
import re

import pandas as pd
from wordcloud import WordCloud

# PATH = os.path.join(os.getcwd(), r"static/assets/img/brand/wc_img2.png")
#
# PATH_TO_WORDCLOUD_IMG = os.path.normpath(PATH)


def raw_data_to_dfs(input_data_list):
    df_list = []

    for i in input_data_list:
        dic = i['wordcount']
        dic_df = pd.read_json(dic)
        df_list.append(dic_df)

    return df_list


def find_common_words(data_df_list, num_of_highest_freq_common_words=75):
    word_count_df_concat = pd.concat(data_df_list).sort_values(
        by='word frequency', ascending=False)
    word_count_all_duplicate_df = word_count_df_concat[word_count_df_concat.duplicated(
        'words', keep=False)]
    word_count_all_duplicate_df_ = word_count_all_duplicate_df.groupby('words').agg(
        {'word frequency': 'sum'}).sort_values(
        by='word frequency', ascending=False)
    word_count_all_duplicate_df_ = word_count_all_duplicate_df_.head(
        num_of_highest_freq_common_words)

    return word_count_all_duplicate_df_


def get_word_cloud(word_count_df):
    word_count_df_dic = word_count_df.to_dict()['word frequency']
    # wordcloud = WordCloud(background_color='white', width=1920, height=1080, max_words=1628, relative_scaling=1,
    #                       normalize_plurals=False).generate_from_frequencies(word_count_df_dic)

    # wordcloud.to_file(PATH_TO_WORDCLOUD_IMG)
    # print("before delete")
    # print(word_count_df_dic)

    unwanted = ["''", '``', 'google', 'https', 'http', 'url', 'article', 'scholar',
                'et', 'al', 'publication', 'outcome', 'author', 'pubmed',
                'google', 'https', 'deutschen', 'ed', "'s", 'de', 'm.', 'z.b']
    for i in unwanted:
        key = i
        if key in word_count_df_dic:
            del word_count_df_dic[key]

    for key in word_count_df_dic:
        match = re.search('www.', key)
        if match:
            del word_count_df_dic[key]

    # print("after deleting")
    # print(word_count_df_dic)

    return word_count_df_dic


def word_cloud(input_data_dic_list, num_of_highest_freq_common_words=75):
    df_list = raw_data_to_dfs(input_data_dic_list)
    common_words_df = find_common_words(
        df_list, num_of_highest_freq_common_words)
    return get_word_cloud(common_words_df)
