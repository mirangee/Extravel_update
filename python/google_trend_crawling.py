from pytrends.request import TrendReq
import mysql.connector

# DB 접속을 위한 정보 세팅
mydb = mysql.connector.connect(
    host='192.168.0.28',
    user='et',
    passwd='et',
    database = 'et'
)

# sql 실행을 위한 커서 생성
mycursor = mydb.cursor()

pytrends = TrendReq(hl='ko', tz=540)

nation_name = ["미국", "태국", "싱가포르", "스웨덴", "사우디아라비아", "뉴질랜드", "노르웨이", "말레이시아", "쿠웨이트", "아랍에미리트",
"호주", "바레인", "브루나이", "캐나다", "스위스", "중국", "덴마크", "유럽", "영국", "홍콩", "인도네시아", "일본"]

nation_code = ["US", "TH", "SG", "SE", "SA", "NZ", "NO", "MY", "KW", "AE", "AU", "BH", "BN", "CA", "CH", "CN", "DK", "EU", "GB", "HK", "ID", "JP"]

for name, code  in zip(nation_name, nation_code):
    keyword_list = [name + "여행"] 
    pytrends.build_payload(keyword_list, cat=0, timeframe='now 7-d', geo='KR')
    data = pytrends.interest_over_time()

    if not data.empty:
        # 'isPartial' 열 제거 (있을 경우)
        if 'isPartial' in data.columns:
            data = data.drop(columns=['isPartial'])

        # 일주일치 총 검색 횟수 계산
        total_searches = int(data[keyword_list[0]].sum())

        print(f"{name} 일주일 검색 횟수: {total_searches}")
    else:
        print(f"{name} 검색 횟수 데이터가 없습니다.")
        total_searches = 0

    # sql을 문자열로 작성하고 변수가 들어갈 위치를 %s, %d 등으로 표현
    query = 'UPDATE search_trend SET total_searches = %s WHERE nation_code = %s' 
    values = (str(total_searches), code)

    # 쿼리 실행
    mycursor.execute(query, values)
mydb.commit()

mycursor.close()
mydb.close()




