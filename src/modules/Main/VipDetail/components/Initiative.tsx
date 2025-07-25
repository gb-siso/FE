import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useAtomValue, useSetAtom } from 'jotai';
import { billAtom, getBillsAtom } from '../../atom';
import useHandler from '@/app/hooks/useHandler';
import Spinner from '@/app/_components/Spinner';

const colors = [
  'crimson',
  '#FF9800',
  '#4CAF50',
  '#2196F3',
  '#9C27B0', // 퍼플 (보라 계열로 대비)
  '#00BCD4', // 시안 (밝은 청록색)
  '#FFC107', // 밝은 앰버 (노란빛 강조)
  '#795548', // 브라운 (중간톤 중립색)
  '#607D8B', // 블루그레이 (시각적 안정성)
  '#B0174A' // 핑크레드 톤다운 (채도·명도 낮춘 버전)
];

const LIST = [
  {
    billListProjectionDTO: {
      billId: 12941,
      billNo: '2211434',
      billName: '지방세특례제한법 일부개정법률안',
      committee: null,
      proposeDt: '2025-07-11',
      procResult: null,
      age: '22',
      detailLink:
        'http://likms.assembly.go.kr/bill/billDetail.do?billId=PRC_Q2R5P0Q7O0P1F1F4D1E8C0B2B7J8K5&ageFrom=22&ageTo=22',
      lawProcDt: null,
      lawPresentDt: null,
      lawSubmitDt: null,
      cmtProcResultCd: null,
      cmtProcDt: null,
      cmtPresentDt: null,
      committeeDt: null,
      procDt: null,
      committeeId: null,
      lawProcResultCd: null,
      category: '재정',
      content:
        '인구감소지역 부동산 및 사업장 취득에 대한 취득세·재산세 감면 일몰 4년 연장.  ',
      reason:
        '저출생과 수도권 인구 집중으로 인한 지역 인구감소 확산에 따른 지속 지원 필요성.  ',
      expected: '인구감소지역 세제지원 지속으로 지역 창업 및 경제 활성화 기여.'
    },
    congressmanBillListDTOList: [
      {
        congressmanId: 'ojgCGjUWMz-QflKKLTL3DA',
        name: '김형동'
      },
      {
        congressmanId: 'oqJWkRhCAbsBBqgaqqZsgg',
        name: '고동진'
      },
      {
        congressmanId: 'zG8rO_fj6M4VNXcerReCcA',
        name: '우재준'
      },
      {
        congressmanId: '6q4IHeJvlqfFAtGaSfdt1g',
        name: '박정하'
      },
      {
        congressmanId: '4k-eCQnNdAOM0X3maRc8Ew',
        name: '박정훈'
      },
      {
        congressmanId: 'PFOjzC7_kxFamaF3avv3XQ',
        name: '임이자'
      },
      {
        congressmanId: 'TYpM7sgRe91k167yY0N0SQ',
        name: '박대출'
      },
      {
        congressmanId: 'dm2fbQZHrgR3AR6kpVl3Ig',
        name: '서명옥'
      },
      {
        congressmanId: '5XwhRAe20YLQEhhVuPOwOg',
        name: '조지연'
      },
      {
        congressmanId: 'lAJjokbnO76YfrEprFqhrw',
        name: '안철수'
      },
      {
        congressmanId: '8gnN0q8gY5rfmWhc6EV5og',
        name: '강명구'
      },
      {
        congressmanId: 'lewPhcFn_2GgKawHqFBuDQ',
        name: '김기웅'
      },
      {
        congressmanId: 'Jc-r6RnrwAzSV4oWWXxlDA',
        name: '김위상'
      }
    ]
  },
  {
    billListProjectionDTO: {
      billId: 12975,
      billNo: '2211400',
      billName: '지방세특례제한법 일부개정법률안',
      committee: '행정안전위원회',
      proposeDt: '2025-07-10',
      procResult: null,
      age: '22',
      detailLink:
        'http://likms.assembly.go.kr/bill/billDetail.do?billId=PRC_L2L5J0I7J0H7H1P4P2O4P5N6N7M5I5&ageFrom=22&ageTo=22',
      lawProcDt: null,
      lawPresentDt: null,
      lawSubmitDt: null,
      cmtProcResultCd: null,
      cmtProcDt: null,
      cmtPresentDt: null,
      committeeDt: '2025-07-11',
      procDt: null,
      committeeId: '9700480',
      lawProcResultCd: null,
      category: '주택',
      content:
        '출산·육아 가구의 비수도권 1주택 취득 시 취득세 감면 및 미분양 주택 취득세 면제 적용기한 2년 연장.  ',
      reason:
        '비수도권 악성 미분양 주택 급증과 출산율 제고 필요성 증가 배경.  ',
      expected:
        '비수도권 미분양 해소, 출산율 상승 및 지역경제 활성화 효과 기대.'
    },
    congressmanBillListDTOList: [
      {
        congressmanId: 'KkFYEGlsB9Y8iRKov-lLvA',
        name: '윤영석'
      },
      {
        congressmanId: 'TYpM7sgRe91k167yY0N0SQ',
        name: '박대출'
      },
      {
        congressmanId: 'wDFbJE4IgfBkJSA7o7d4AQ',
        name: '김소희'
      },
      {
        congressmanId: 'MfiyEjmrWOPICVVJi-cVQQ',
        name: '서일준'
      },
      {
        congressmanId: 'sS76keuqAT1mSWuz7g_MBA',
        name: '박성민'
      },
      {
        congressmanId: 'zzp7lhzWBIQ_oCzAE9lFuQ',
        name: '조경태'
      },
      {
        congressmanId: 'hQUekVTVkLVIhEbvoe5R_w',
        name: '임종득'
      },
      {
        congressmanId: 'pkq6n8ActNjA-_Tkx3p4NQ',
        name: '김태호'
      },
      {
        congressmanId: '_kiFD5TzWbEgPXzp6RJMwA',
        name: '김대식'
      },
      {
        congressmanId: 'mUAJhMB8T0MXUEaYggRE1g',
        name: '정동만'
      },
      {
        congressmanId: 'AZGNFQ1EMV73cojflMs51A',
        name: '김종양'
      },
      {
        congressmanId: '8gnN0q8gY5rfmWhc6EV5og',
        name: '강명구'
      },
      {
        congressmanId: 'nS1pfpt1e0Z0pn9GJndktQ',
        name: '곽규택'
      }
    ]
  },
  {
    billListProjectionDTO: {
      billId: 13006,
      billNo: '2211369',
      billName: '지방세특례제한법 일부개정법률안',
      committee: '행정안전위원회',
      proposeDt: '2025-07-09',
      procResult: null,
      age: '22',
      detailLink:
        'http://likms.assembly.go.kr/bill/billDetail.do?billId=PRC_J2K5G0G7E0F1D1C4C1K7K1J5K7I2I1&ageFrom=22&ageTo=22',
      lawProcDt: null,
      lawPresentDt: null,
      lawSubmitDt: null,
      cmtProcResultCd: null,
      cmtProcDt: null,
      cmtPresentDt: null,
      committeeDt: '2025-07-10',
      procDt: null,
      committeeId: '9700480',
      lawProcResultCd: null,
      category: '조세',
      content:
        '생애최초 주택 구입자 취득세 감면 일몰기한을 2029년 12월 31일까지 연장함.  ',
      reason:
        '주택 가격 상승으로 인한 경제적 부담 증가와 감면 지속 필요성 제기에 따른 조치임.  ',
      expected:
        '생애최초 주택 구입자의 세금 부담 경감 및 주택 시장 활성화 기대됨.'
    },
    congressmanBillListDTOList: [
      {
        congressmanId: 'ojgCGjUWMz-QflKKLTL3DA',
        name: '김형동'
      },
      {
        congressmanId: 'oqJWkRhCAbsBBqgaqqZsgg',
        name: '고동진'
      },
      {
        congressmanId: 'zG8rO_fj6M4VNXcerReCcA',
        name: '우재준'
      },
      {
        congressmanId: '6q4IHeJvlqfFAtGaSfdt1g',
        name: '박정하'
      },
      {
        congressmanId: '4k-eCQnNdAOM0X3maRc8Ew',
        name: '박정훈'
      },
      {
        congressmanId: 'PFOjzC7_kxFamaF3avv3XQ',
        name: '임이자'
      },
      {
        congressmanId: 'TYpM7sgRe91k167yY0N0SQ',
        name: '박대출'
      },
      {
        congressmanId: 'dm2fbQZHrgR3AR6kpVl3Ig',
        name: '서명옥'
      },
      {
        congressmanId: '5XwhRAe20YLQEhhVuPOwOg',
        name: '조지연'
      },
      {
        congressmanId: 'lAJjokbnO76YfrEprFqhrw',
        name: '안철수'
      },
      {
        congressmanId: '8gnN0q8gY5rfmWhc6EV5og',
        name: '강명구'
      },
      {
        congressmanId: 'lewPhcFn_2GgKawHqFBuDQ',
        name: '김기웅'
      },
      {
        congressmanId: 'Jc-r6RnrwAzSV4oWWXxlDA',
        name: '김위상'
      }
    ]
  },
  {
    billListProjectionDTO: {
      billId: 13086,
      billNo: '2211288',
      billName: '집회 및 시위에 관한 법률 일부개정법률안',
      committee: '행정안전위원회',
      proposeDt: '2025-07-04',
      procResult: null,
      age: '22',
      detailLink:
        'http://likms.assembly.go.kr/bill/billDetail.do?billId=PRC_M2N5L0L6J2L3J1J7R5Q2Q0O0P5N8O2&ageFrom=22&ageTo=22',
      lawProcDt: null,
      lawPresentDt: null,
      lawSubmitDt: null,
      cmtProcResultCd: null,
      cmtProcDt: null,
      cmtPresentDt: null,
      committeeDt: '2025-07-07',
      procDt: null,
      committeeId: '9700480',
      lawProcResultCd: null,
      category: '교육',
      content: '학교 주변 일정 시간 동안 확성기 사용 금지 규정 신설.  ',
      reason:
        '집회 소음으로 인한 학생 학습권 침해 빈번, 교육환경 보호 필요성 증대.  ',
      expected: '학교 수업 환경 평온 유지와 교육권 보호 강화 기대.'
    },
    congressmanBillListDTOList: [
      {
        congressmanId: '7TzUdRGM6b-Ap8jwsc9fig',
        name: '이성권'
      },
      {
        congressmanId: 'JIS5kX8jgHOkH85tEfk2Qw',
        name: '정성국'
      },
      {
        congressmanId: '8Fd6mVQcWCRQQJXHqOzGjw',
        name: '조정훈'
      },
      {
        congressmanId: 'zG8rO_fj6M4VNXcerReCcA',
        name: '우재준'
      },
      {
        congressmanId: 'n7PUyrKSmQUIEKegMwqiEQ',
        name: '정연욱'
      },
      {
        congressmanId: '6q4IHeJvlqfFAtGaSfdt1g',
        name: '박정하'
      },
      {
        congressmanId: 'QhNp-WBH5pHqrFFatL8DEA',
        name: '김용태'
      },
      {
        congressmanId: 'pi1-Ing9EuOcTD5gSVXoLQ',
        name: '김재섭'
      },
      {
        congressmanId: 'MxMv759SS6m0jRTBy9jKYQ',
        name: '김건'
      },
      {
        congressmanId: 'D0AJzHLa2r5yb6cUtUu3xw',
        name: '신성범'
      },
      {
        congressmanId: 'QOCFyBm-iEhuwwH55alDlw',
        name: '조은희'
      },
      {
        congressmanId: 'MfG9tUakywjXq920ef8yaQ',
        name: '박상웅'
      },
      {
        congressmanId: '8gnN0q8gY5rfmWhc6EV5og',
        name: '강명구'
      }
    ]
  },
  {
    billListProjectionDTO: {
      billId: 13169,
      billNo: '2211198',
      billName: '행정조사기본법 일부개정법률안',
      committee: '정무위원회',
      proposeDt: '2025-07-01',
      procResult: null,
      age: '22',
      detailLink:
        'http://likms.assembly.go.kr/bill/billDetail.do?billId=PRC_T2U5C0D6B1B9A0Y9Z5H3H2F7G7E1F2&ageFrom=22&ageTo=22',
      lawProcDt: null,
      lawPresentDt: null,
      lawSubmitDt: null,
      cmtProcResultCd: null,
      cmtProcDt: null,
      cmtPresentDt: null,
      committeeDt: '2025-07-02',
      procDt: null,
      committeeId: '9700008',
      lawProcResultCd: null,
      category: '행정',
      content:
        '조사대상자에게 진술거부권과 전문가 조력 권리 고지 및 답변 조서 기재 의무 부여.  ',
      reason:
        '행정조사 시 권익 침해 우려와 방어권 침해 지적에 따른 개선 목적.  ',
      expected: '행정기관의 조사권 남용 방지와 국민 방어권 강화 기대 효과.'
    },
    congressmanBillListDTOList: [
      {
        congressmanId: '4SypG2OwzvOspHwO4wVHXA',
        name: '권성동'
      },
      {
        congressmanId: 'rutzwKP61BvekdwPlvf6bA',
        name: '윤한홍'
      },
      {
        congressmanId: 'D0AJzHLa2r5yb6cUtUu3xw',
        name: '신성범'
      },
      {
        congressmanId: 'pi1-Ing9EuOcTD5gSVXoLQ',
        name: '김재섭'
      },
      {
        congressmanId: 'VdL7IwXO5DUhM_n7yBb5HA',
        name: '박형수'
      },
      {
        congressmanId: 'BMJD8DuAKiAG0QXYKDvGxA',
        name: '김장겸'
      },
      {
        congressmanId: 'aaXgRNw79Iq5OHmBy0KUjQ',
        name: '권영세'
      },
      {
        congressmanId: '8gnN0q8gY5rfmWhc6EV5og',
        name: '강명구'
      },
      {
        congressmanId: 'mUAJhMB8T0MXUEaYggRE1g',
        name: '정동만'
      },
      {
        congressmanId: 'KegB_aozyIgI12EDdvr2BA',
        name: '유상범'
      }
    ]
  },
  {
    billListProjectionDTO: {
      billId: 13207,
      billNo: '2211160',
      billName: '조세특례제한법 일부개정법률안',
      committee: '기획재정위원회',
      proposeDt: '2025-06-30',
      procResult: null,
      age: '22',
      detailLink:
        'http://likms.assembly.go.kr/bill/billDetail.do?billId=PRC_I2G5H0P6P1N1M1N4L3M4H5I3G1G7F8&ageFrom=22&ageTo=22',
      lawProcDt: null,
      lawPresentDt: null,
      lawSubmitDt: null,
      cmtProcResultCd: null,
      cmtProcDt: null,
      cmtPresentDt: null,
      committeeDt: '2025-07-01',
      procDt: null,
      committeeId: '9700300',
      lawProcResultCd: null,
      category: '재정',
      content:
        '고향사랑 기부금 세액공제 한도 10만원에서 20만원으로 확대 및 1천만원 초과 2천만원 이하 기부금에 30% 세액공제율 신설.  ',
      reason:
        '지역소멸 위기와 지방재정 열악 개선 위해 추가 인센티브 필요성 제기.  ',
      expected: '기부 활성화로 지방재정 확충 및 지역경제 활성화 기여 기대.'
    },
    congressmanBillListDTOList: [
      {
        congressmanId: 'pkq6n8ActNjA-_Tkx3p4NQ',
        name: '김태호'
      },
      {
        congressmanId: '89py1WgOccmugv1Wl9za2Q',
        name: '이인선'
      },
      {
        congressmanId: 'zG8rO_fj6M4VNXcerReCcA',
        name: '우재준'
      },
      {
        congressmanId: 'b4PjnpdirrDrJduA3VqBBA',
        name: '성일종'
      },
      {
        congressmanId: '8gnN0q8gY5rfmWhc6EV5og',
        name: '강명구'
      },
      {
        congressmanId: '6q4IHeJvlqfFAtGaSfdt1g',
        name: '박정하'
      },
      {
        congressmanId: '_II1xWifN9TEffvteM8rSQ',
        name: '이상휘'
      },
      {
        congressmanId: 'zzp7lhzWBIQ_oCzAE9lFuQ',
        name: '조경태'
      },
      {
        congressmanId: 'jYTRtg98Gals1MLltnfumw',
        name: '박충권'
      },
      {
        congressmanId: 'oqJWkRhCAbsBBqgaqqZsgg',
        name: '고동진'
      },
      {
        congressmanId: 'D0AJzHLa2r5yb6cUtUu3xw',
        name: '신성범'
      },
      {
        congressmanId: 'n7PUyrKSmQUIEKegMwqiEQ',
        name: '정연욱'
      }
    ]
  },
  {
    billListProjectionDTO: {
      billId: 13210,
      billNo: '2211157',
      billName: '도로교통법 일부개정법률안',
      committee: '행정안전위원회',
      proposeDt: '2025-06-30',
      procResult: null,
      age: '22',
      detailLink:
        'http://likms.assembly.go.kr/bill/billDetail.do?billId=PRC_X2W5W0U6V1D1B1C4A3B2Z2A8H5G8H3&ageFrom=22&ageTo=22',
      lawProcDt: null,
      lawPresentDt: null,
      lawSubmitDt: null,
      cmtProcResultCd: null,
      cmtProcDt: null,
      cmtPresentDt: null,
      committeeDt: '2025-07-01',
      procDt: null,
      committeeId: '9700480',
      lawProcResultCd: null,
      category: '교통',
      content:
        '개인형 이동장치 대여 시 이용자의 나이와 면허 보유 여부 확인 의무화 및 운전자격확인시스템 구축.  ',
      reason:
        '공유 플랫폼을 통한 대여로 무면허 운전자 및 16세 미만 이용자의 안전사고와 불법 이용 문제 지속 제기 배경.  ',
      expected:
        '운전자격 확인 강화로 개인형 이동장치의 안전한 이용환경 조성 기대.'
    },
    congressmanBillListDTOList: [
      {
        congressmanId: 'pkq6n8ActNjA-_Tkx3p4NQ',
        name: '김태호'
      },
      {
        congressmanId: '89py1WgOccmugv1Wl9za2Q',
        name: '이인선'
      },
      {
        congressmanId: 'zG8rO_fj6M4VNXcerReCcA',
        name: '우재준'
      },
      {
        congressmanId: 'mUAJhMB8T0MXUEaYggRE1g',
        name: '정동만'
      },
      {
        congressmanId: 'b4PjnpdirrDrJduA3VqBBA',
        name: '성일종'
      },
      {
        congressmanId: 'MxMv759SS6m0jRTBy9jKYQ',
        name: '김건'
      },
      {
        congressmanId: '8gnN0q8gY5rfmWhc6EV5og',
        name: '강명구'
      },
      {
        congressmanId: '6q4IHeJvlqfFAtGaSfdt1g',
        name: '박정하'
      },
      {
        congressmanId: 'zzp7lhzWBIQ_oCzAE9lFuQ',
        name: '조경태'
      },
      {
        congressmanId: 'jYTRtg98Gals1MLltnfumw',
        name: '박충권'
      },
      {
        congressmanId: 'D0AJzHLa2r5yb6cUtUu3xw',
        name: '신성범'
      },
      {
        congressmanId: 'n7PUyrKSmQUIEKegMwqiEQ',
        name: '정연욱'
      }
    ]
  },
  {
    billListProjectionDTO: {
      billId: 13250,
      billNo: '2211113',
      billName: '국가자원안보 특별법 일부개정법률안',
      committee: '산업통상자원중소벤처기업위원회',
      proposeDt: '2025-06-27',
      procResult: null,
      age: '22',
      detailLink:
        'http://likms.assembly.go.kr/bill/billDetail.do?billId=PRC_S2N5O0M6L1L7J1K7S3T9R3R8Q6O6P8&ageFrom=22&ageTo=22',
      lawProcDt: null,
      lawPresentDt: null,
      lawSubmitDt: null,
      cmtProcResultCd: null,
      cmtProcDt: null,
      cmtPresentDt: null,
      committeeDt: '2025-06-30',
      procDt: null,
      committeeId: '9700481',
      lawProcResultCd: null,
      category: '자원',
      content:
        '신재생에너지 설비 부품 국산화 필요성을 반영해 핵심자원 정의 확대 및 자원안보 기본계획 수립 주기 3년으로 단축.  ',
      reason:
        '높은 외국산 의존도와 국제 에너지 시장 변동성에 따른 신속한 대응 필요성 제기.  ',
      expected:
        '공급망 안정성 강화와 국가자원안보 정책 신속 대응체계 확립 기여.'
    },
    congressmanBillListDTOList: [
      {
        congressmanId: 'QHTTETb2bKvgkNcCnGskyw',
        name: '구자근'
      },
      {
        congressmanId: 'vbvG9eexfg1qTtH4L_sf1g',
        name: '인요한'
      },
      {
        congressmanId: 'Q3xnBMOx5eVx9i9w68qglA',
        name: '김선교'
      },
      {
        congressmanId: 'Jc-r6RnrwAzSV4oWWXxlDA',
        name: '김위상'
      },
      {
        congressmanId: '3cfI9S9P6Xck5ttW-Strsw',
        name: '신동욱'
      },
      {
        congressmanId: 'i8nCw4QVF-9j-RUoMOz8vw',
        name: '최수진'
      },
      {
        congressmanId: 'qdLZJy6hluh1wZsB_y9HCw',
        name: '박덕흠'
      },
      {
        congressmanId: 'I-n1aeNN3Fi6gM6Pixcnjw',
        name: '박준태'
      },
      {
        congressmanId: 'pW94rG5bsff2iJLWN7WGvg',
        name: '이만희'
      },
      {
        congressmanId: 'QGOahJ0pPcimW_54GETDIA',
        name: '강대식'
      },
      {
        congressmanId: 'mUAJhMB8T0MXUEaYggRE1g',
        name: '정동만'
      },
      {
        congressmanId: '_WIwyC2SW2IWdHnpcS6tIQ',
        name: '배준영'
      },
      {
        congressmanId: '3NBRFcUwJeQ8pl9ONM-3zA',
        name: '정점식'
      },
      {
        congressmanId: '8gnN0q8gY5rfmWhc6EV5og',
        name: '강명구'
      },
      {
        congressmanId: 'KUy0owduTVVbOdH54Co53w',
        name: '김도읍'
      }
    ]
  },
  {
    billListProjectionDTO: {
      billId: 13265,
      billNo: '2211098',
      billName: '위험작전 참여 군인 지원에 관한 법률안',
      committee: '정무위원회',
      proposeDt: '2025-06-26',
      procResult: null,
      age: '22',
      detailLink:
        'http://likms.assembly.go.kr/bill/billDetail.do?billId=PRC_E2D5D0B6C2K3K0J9J3I2I3G7H1D9B3&ageFrom=22&ageTo=22',
      lawProcDt: null,
      lawPresentDt: null,
      lawSubmitDt: null,
      cmtProcResultCd: null,
      cmtProcDt: null,
      cmtPresentDt: null,
      committeeDt: '2025-06-27',
      procDt: null,
      committeeId: '9700008',
      lawProcResultCd: null,
      category: '보훈',
      content:
        '위험작전에 참여한 군인에게 위험작전참여수당, 의료비 감면, 요양 및 재가복지 지원 부여.  ',
      reason:
        '신체적 희생 없거나 6·25·월남전쟁 외 작전 참여 군인 보훈 사각지대 해소 목적.  ',
      expected:
        '국가유공자 범위 확대 및 위험작전 군인 명예 선양, 국민 애국정신 함양 기대.'
    },
    congressmanBillListDTOList: [
      {
        congressmanId: 'rutzwKP61BvekdwPlvf6bA',
        name: '윤한홍'
      },
      {
        congressmanId: 'Jc-r6RnrwAzSV4oWWXxlDA',
        name: '김위상'
      },
      {
        congressmanId: 'MfG9tUakywjXq920ef8yaQ',
        name: '박상웅'
      },
      {
        congressmanId: 'E_9bG1ZWcfx4_KxmGDnsGQ',
        name: '주진우'
      },
      {
        congressmanId: 'VdL7IwXO5DUhM_n7yBb5HA',
        name: '박형수'
      },
      {
        congressmanId: '2VXJnpMntn30Vz4nQnVn0g',
        name: '김상훈'
      },
      {
        congressmanId: 'qdLZJy6hluh1wZsB_y9HCw',
        name: '박덕흠'
      },
      {
        congressmanId: '2wavWIjVyfifkvDdBIGgGQ',
        name: '엄태영'
      },
      {
        congressmanId: 'i8nCw4QVF-9j-RUoMOz8vw',
        name: '최수진'
      },
      {
        congressmanId: 'pi1-Ing9EuOcTD5gSVXoLQ',
        name: '김재섭'
      },
      {
        congressmanId: '4SypG2OwzvOspHwO4wVHXA',
        name: '권성동'
      },
      {
        congressmanId: '8gnN0q8gY5rfmWhc6EV5og',
        name: '강명구'
      }
    ]
  },
  {
    billListProjectionDTO: {
      billId: 13268,
      billNo: '2211095',
      billName: '가사소송법 일부개정법률안',
      committee: '법제사법위원회',
      proposeDt: '2025-06-26',
      procResult: null,
      age: '22',
      detailLink:
        'http://likms.assembly.go.kr/bill/billDetail.do?billId=PRC_H2G5G0E6N2N3L1M7K5L0J5K9R4Q6R6&ageFrom=22&ageTo=22',
      lawProcDt: null,
      lawPresentDt: null,
      lawSubmitDt: null,
      cmtProcResultCd: null,
      cmtProcDt: null,
      cmtPresentDt: null,
      committeeDt: '2025-06-27',
      procDt: null,
      committeeId: '9700006',
      lawProcResultCd: null,
      category: '보호',
      content:
        '미성년 연예인 소득의 50% 이상을 본인 명의 신탁 계좌에 의무 예치, 법원 허가 없이는 출금 제한.  ',
      reason:
        '부모 등 법정대리인의 부적절한 수입 관리로 인한 미성년 연예인 소득 보호 필요성 대두.  ',
      expected:
        '미성년 연예인 경제적 자립 기반 마련 및 소득 보호 강화 효과 기대.'
    },
    congressmanBillListDTOList: [
      {
        congressmanId: '518LUhMv7A5GCHgeUf2bKg',
        name: '배현진'
      },
      {
        congressmanId: 'i8nCw4QVF-9j-RUoMOz8vw',
        name: '최수진'
      },
      {
        congressmanId: 'JIS5kX8jgHOkH85tEfk2Qw',
        name: '정성국'
      },
      {
        congressmanId: 'OHGM0KGKLBqw7BSn4oGtxA',
        name: '김예지'
      },
      {
        congressmanId: 'zG8rO_fj6M4VNXcerReCcA',
        name: '우재준'
      },
      {
        congressmanId: 'wDFbJE4IgfBkJSA7o7d4AQ',
        name: '김소희'
      },
      {
        congressmanId: 'gQg2evBpzQ6OAv3NLZPPeA',
        name: '김승수'
      },
      {
        congressmanId: 'n7PUyrKSmQUIEKegMwqiEQ',
        name: '정연욱'
      },
      {
        congressmanId: 's3QDJEQ6qD1MzvJLRmdTtQ',
        name: '안상훈'
      },
      {
        congressmanId: 'rxquhEvqY-IUpKHwIClqIA',
        name: '김성원'
      },
      {
        congressmanId: 'oqJWkRhCAbsBBqgaqqZsgg',
        name: '고동진'
      },
      {
        congressmanId: '6q4IHeJvlqfFAtGaSfdt1g',
        name: '박정하'
      },
      {
        congressmanId: 'sY5vEwQ3IYEDCtjKHr8jzg',
        name: '진종오'
      },
      {
        congressmanId: 'D0AJzHLa2r5yb6cUtUu3xw',
        name: '신성범'
      },
      {
        congressmanId: 'MxMv759SS6m0jRTBy9jKYQ',
        name: '김건'
      },
      {
        congressmanId: '8gnN0q8gY5rfmWhc6EV5og',
        name: '강명구'
      }
    ]
  }
];

const News: React.FC<any> = ({ vipData }) => {
  const [isMore, setIsMore] = useState(false);
  const [selected, setSelected] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const bills = useAtomValue(billAtom);
  const getBills = useSetAtom(getBillsAtom);
  const list = bills?.billList || [];

  const more = bills?.lastPage > currentPage;

  // HTTP 요청
  const { isLoading, handler: initHandler } = useHandler(
    async (page: number) => {
      const id = vipData?.congressmanList[0]?.id;
      await getBills({ id, query: { page } });
      setCurrentPage(page + 1);
    }
  );

  const modalHandler = (item: any) => {
    setSelected(item);
  };
  const modalCloseHandler = () => {
    setSelected(null);
  };

  const hadleMovePage = (url: string) => {
    window.open(url, '_blank');
  };

  useEffect(() => {
    if (selected) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selected]);

  useEffect(() => {
    initHandler(currentPage);
  }, []);

  return (
    <Wrapper>
      <TitleWrapper>
        <NewsTitle>⚖️ 최근 발의한 법안</NewsTitle>
      </TitleWrapper>

      {isLoading && (
        <Spinner title={'입법활동 데이터를 가져오는 중이에요! 😊'} />
      )}

      {!list?.length && !isLoading && (
        <NotFound>해당 의원의 입법활동 기록이 없어요. 🥲</NotFound>
      )}

      <MainSection>
        {LIST?.map((item: any, index: number) => {
          const { billListProjectionDTO: bill } = item;
          const colorIndex = index % colors.length;
          const fontSize = bill.category.length > 6 ? '1.2rem' : '1.5rem';
          const shortCategory =
            bill.category.length > 8
              ? `${bill.category.slice(0, 6)}...`
              : bill.category;

          return (
            <Card
              key={index}
              $color={colors[colorIndex]}
              onClick={() => {
                setSelected(item);
              }}
            >
              <CategoryBadge>{shortCategory}</CategoryBadge>
              <BillName>{bill.billName}</BillName>
              {bill.committeeDt ? (
                <DateBadge>{bill.committeeDt}</DateBadge>
              ) : (
                <div />
              )}
            </Card>
          );
        })}
      </MainSection>

      {more && (
        <MoreButton onClick={() => initHandler(currentPage)}>
          더보기 <ArrowIcon>→</ArrowIcon>
        </MoreButton>
      )}

      {selected && (
        <ModalOverlay onClick={() => setSelected(null)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>{selected.billListProjectionDTO.billName}</ModalTitle>
              <CloseButton onClick={() => setSelected(null)}>×</CloseButton>
            </ModalHeader>

            <ModalBody>
              <InfoSection>
                <InfoLabel>법안 요약</InfoLabel>
                <InfoText>{selected.billListProjectionDTO.content}</InfoText>
              </InfoSection>

              <InfoSection>
                <InfoLabel>발의 이유</InfoLabel>
                <InfoText>{selected.billListProjectionDTO.reason}</InfoText>
              </InfoSection>

              <InfoSection>
                <InfoLabel>기대 효과</InfoLabel>
                <InfoText>{selected.billListProjectionDTO.expected}</InfoText>
              </InfoSection>

              <DetailButton
                onClick={() =>
                  window.open(
                    selected.billListProjectionDTO.detailLink,
                    '_blank'
                  )
                }
              >
                자세히 보기
              </DetailButton>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      )}
    </Wrapper>
  );
};

export default News;

// 스타일 컴포넌트
const Wrapper = styled.div`
  width: 95%;
  box-sizing: border-box;
  max-width: 750px;
  margin: 2rem auto;
  padding: 1.5rem;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

  @media (max-width: 768px) {
    max-width: 600px;
    padding: 0;
  }
`;

const TitleWrapper = styled.div`
  margin-bottom: 1.5rem;
`;

const NewsTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const MainSection = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin: 1.5rem 0;

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 15px;
  }
`;

const Card = styled.div<{ $color: string }>`
  background: ${({ $color }) => $color};
  border-radius: 12px;
  padding: 1.5rem;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: rgba(255, 255, 255, 0.3);
  }
  @media (max-width: 768px) {
    min-height: 100px;
    padding: 1rem;
  }
`;

const CategoryBadge = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const BillName = styled.div`
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.4;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const DateBadge = styled.div`
  background: rgba(255, 255, 255, 0.2);
  padding: 0.3rem 0.6rem;
  border-radius: 12px;
  font-size: 0.8rem;
  align-self: flex-start;
`;

const MoreButton = styled.button`
  background: linear-gradient(135deg, #8800fb 0%, #9c27b0 100%);

  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1.5rem auto 0;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(136, 0, 251, 0.3);
    background: linear-gradient(135deg, #9c27b0 0%, #8800fb 100%);
    &::after {
      content: '';
      position: absolute;
      right: 15px;
      transition: all 0.3s ease;
    }
  }
`;

const ArrowIcon = styled.span`
  transition: transform 0.3s ease;
  ${MoreButton}:hover & {
    transform: translateX(3px);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
  backdrop-filter: blur(5px);
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
  position: sticky;
  top: 0;
  background: white;
  z-index: 10;
`;

const ModalTitle = styled.h3`
  margin: 0;
  font-size: 1.3rem;
  color: #333;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  padding: 0.5rem;

  &:hover {
    color: #333;
  }
`;

const ModalBody = styled.div`
  padding: 1.5rem;
`;

const InfoSection = styled.div`
  margin-bottom: 1.5rem;
`;

const InfoLabel = styled.div`
  font-weight: 600;
  color: #6e45e2;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
`;

const InfoText = styled.div`
  line-height: 1.6;
  color: #555;
`;

const DetailButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #6e45e2 0%, #88d3ce 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  margin-top: 1rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(110, 69, 226, 0.3);
  }
`;

const NotFound = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
  font-size: 1.1rem;
`;

// import styled from 'styled-components';
// import 'swiper/css';
// import 'swiper/css/pagination';

// import 'swiper/css/navigation';

// import { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// import { useAtomValue, useSetAtom } from 'jotai';
// import { billAtom, getBillsAtom } from '../../atom';
// import useHandler from '@/app/hooks/useHandler';
// import Spinner from '@/app/_components/Spinner';

// const News: React.FC<any> = ({ vipData }) => {
//   // const [isMore, setIsMore] = useState(false);
//   const [selected, setSelected] = useState<any>(null);
//   const [currentPage, setCurrentPage] = useState(1);

//   const bills = useAtomValue(billAtom);
//   const getBills = useSetAtom(getBillsAtom);
//   const list = bills?.billList || [];

//   const isMore = bills?.lastPage > currentPage;

//   // HTTP 요청
//   const { isLoading, handler: initHandler } = useHandler(
//     async (page: number) => {
//       const id = vipData?.congressmanList[0]?.id;
//       await getBills({ id, query: { page } });
//       setCurrentPage(page + 1);
//     }
//   );

//   const modalHandler = (item: any) => {
//     setSelected(item);
//   };
//   const modalCloseHandler = () => {
//     setSelected(null);
//   };

//   const hadleMovePage = (url: string) => {
//     window.open(url, '_blank');
//   };

//   useEffect(() => {
//     if (selected) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'auto';
//     }
//     return () => {
//       document.body.style.overflow = 'auto';
//     };
//   }, [selected]);

//   useEffect(() => {
//     initHandler(currentPage);
//   }, []);

//   return (
//     <Wrapper>
//       <TitleWrapper>
//         <NewsTitle>⚖️ 최근 발의한 법안들을 한눈에 </NewsTitle>
//       </TitleWrapper>
//       {isLoading && (
//         <Spinner title={'입법활동 데이터를 가져오는 중이에요! 😊'} />
//       )}

//       {!list?.length && !isLoading && (
//         <NotFound>해당 의원의 입법활동 기록이 없어요. 🥲</NotFound>
//       )}
//       <MainSection>
//         {list?.length > 0 &&
//           list.map((item: any, index: number) => {
//             const { billListProjectionDTO: bill } = item;
//             const colorIndex = index >= 10 ? index % 10 : index;
//             const fontSize = bill.category.length > 4 ? '1.5rem' : '2rem';

//             const shortCategory =
//               bill?.category.length > 5
//                 ? bill.category.slice(0, 9) + '…'
//                 : bill.category;

//             return (
//               <Card
//                 $fontSize={fontSize}
//                 key={index}
//                 $color={colors[colorIndex]}
//                 onClick={() => modalHandler(item)}
//                 style={{ fontSize }}
//               >
//                 {shortCategory}
//               </Card>
//             );
//           })}
//       </MainSection>
//       {isMore && (
//         <MoreButton onClick={() => initHandler(currentPage)}>더보기</MoreButton>
//       )}
//       {selected && (
//         <Modal onClick={() => modalCloseHandler()}>
//           <Inner>
//             {/* <Inner onClick={(e) => e.stopPropagation()}> */}
//             <div>[{selected.billListProjectionDTO.billName}] </div>
//             <Column>
//               <span>요약: </span>
//               <span>{selected.billListProjectionDTO.content}</span>
//             </Column>
//             <Column>
//               <span>왜 발의했나요? </span>
//               <span>{selected.billListProjectionDTO.reason}</span>
//             </Column>
//             <Column>
//               <span>기대효과: </span>
//               <span>{selected.billListProjectionDTO.expected}</span>
//             </Column>
//             <Column>
//               <span>발의일자 : </span>
//               <span>{selected.billListProjectionDTO.committeeDt}</span>
//             </Column>
//             <Move
//               onClick={() =>
//                 hadleMovePage(selected.billListProjectionDTO.detailLink)
//               }
//             >
//               <span>자세히 보러가기</span>
//             </Move>
//           </Inner>
//         </Modal>
//       )}
//     </Wrapper>
//   );
// };

// export default News;

// const NewsTitle = styled.p`
//   color: #080a0b;
//   font-size: 1.3rem;
//   font-weight: 500;
//   line-height: 20px;
// `;

// const Wrapper = styled.div`
//   width: 95%;
//   box-sizing: border-box;
//   padding: 1rem 1rem;
//   padding-bottom: 1.2rem;
//   background-color: #fff;
//   margin: 0 auto;
//   margin-top: 1rem;
//   box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
//   border: 1px solid #ddd;
//   border-radius: 12px;
//   display: flex;
//   flex-direction: column;
//   height: 100%;
//   overflow: hidden;
// `;

// const TitleWrapper = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   gap: 5px;
// `;

// const MainSection = styled.div`
//   display: grid;
//   grid-template-columns: repeat(4, 1fr); // 4열 그리드
//   gap: 15px;
//   margin: 1rem auto;
//   width: 100%;

//   /* 태블릿 사이즈 (768px 미만) */
//   @media (max-width: 768px) {
//     grid-template-columns: repeat(2, 1fr); // 2열로 변경
//   }
// `;

// const NotFound = styled.div`
//   margin: 1rem auto;
//   width: 100%;
// `;

// const Card = styled.div<{ $color: string; $fontSize: string }>`
//   box-sizing: border-box;
//   width: 100%;
//   aspect-ratio: 1/1;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   border-radius: 12px;
//   background: ${({ $color }: any) => $color || 'white'};
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   cursor: pointer;
//   transition: all 0.3s ease;
//   text-align: center;
//   font-weight: 500;
//   color: #fff;
//   font-size: ${({ $fontSize }: any) => $fontSize};

//   text-shadow:
//     -1px -1px 0 #000,
//     1px -1px 0 #000,
//     -1px 1px 0 #000,
//     1px 1px 0 #000;

//   position: relative;
//   overflow: hidden;

//   &:hover {
//     transform: translateY(-5px);
//     box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
//   }

//   &:active {
//     transform: translateY(0);
//   }

//   &::after {
//     content: '';
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//   }

//   /* @media (max-width: 768px) {
//     font-size: 1.8rem !important;
//   } */
// `;

// // const Card = styled.div`
// //   box-sizing: border-box;
// //   width: 100px;
// //   height: 100px;
// //   display: flex;
// //   justify-content: center;
// //   align-items: center;
// //   border-radius: 5px;
// //   box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
// //   cursor: pointer;
// // `;

// const Modal = styled.div`
//   width: 100%;
//   height: 100%;
//   position: fixed;
//   top: 0;
//   left: 0;
//   background-color: rgba(0, 0, 0, 0.2);
//   z-index: 20;
// `;

// const Inner = styled.div`
//   box-sizing: border-box;
//   border-radius: 16px;
//   padding: 2rem;
//   position: absolute;
//   left: 50%;
//   top: 50%;
//   transform: translate(-50%, -50%);
//   width: 90%;
//   height: auto;
//   max-width: 550px;
//   max-height: 90vh;
//   background-color: #fff;
//   white-space: pre-line;
//   display: flex;
//   flex-direction: column;
//   gap: 1.5rem;
//   box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
//   overflow-y: auto;

//   @media (max-width: 768px) {
//     padding: 1.5rem 1rem;
//   }

//   /* 제목 스타일 */
//   > div:first-child {
//     font-size: 1.4rem;
//     font-weight: 600;
//     color: #333;
//     margin-bottom: 0.5rem;
//     line-height: 1.4;
//     padding-bottom: 0.5rem;
//     border-bottom: 2px solid #f0f0f0;
//   }

//   /* 스크롤바 스타일 */
//   &::-webkit-scrollbar {
//     width: 8px;
//   }
//   &::-webkit-scrollbar-thumb {
//     background-color: rgba(0, 0, 0, 0.2);
//     border-radius: 4px;
//   }
//   &::-webkit-scrollbar-track {
//     background-color: transparent;
//   }
// `;

// const Column = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 0.5rem;

//   > span:first-child {
//     font-weight: 600;
//     color: #555;
//     font-size: 1.1rem;
//   }

//   > span:last-child {
//     color: #333;
//     line-height: 1.6;
//     padding-left: 0.5rem;
//   }
// `;

// const Move = styled.div`
//   cursor: pointer;
//   padding: 0.8rem 1rem;
//   background-color: #f5f5f5;
//   border-radius: 8px;
//   text-align: center;
//   transition: all 0.3s ease;
//   margin-top: 1rem;
//   font-weight: 500;
//   color: #444;

//   &:hover {
//     background-color: #8800fb;
//     color: white;
//     transform: translateY(-2px);
//     box-shadow: 0 4px 8px rgba(136, 0, 251, 0.2);
//   }

//   &:active {
//     transform: translateY(0);
//   }

//   @media (max-width: 768px) {
//     background-color: #8800fb;
//     color: white;
//   }
// `;

// const MoreButton = styled.button`
//   border: none;
//   width: 120px;
//   height: 40px;
//   margin: 1rem auto 0;
//   background: linear-gradient(135deg, #8800fb 0%, #9c27b0 100%);
//   color: #fff;
//   font-size: 0.95rem;
//   font-weight: 500;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border-radius: 20px;
//   gap: 6px;
//   transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
//   box-shadow: 0 2px 4px rgba(136, 0, 251, 0.2);
//   position: relative;
//   overflow: hidden;

//   background: linear-gradient(135deg, #8800fb 0%, #9c27b0 100%);
//   &:hover {
//     transform: translateY(-2px);
//     box-shadow: 0 4px 8px rgba(136, 0, 251, 0.3);
//     background: linear-gradient(135deg, #9c27b0 0%, #8800fb 100%);

//     &::after {
//       content: '';
//       position: absolute;
//       right: 15px;
//       transition: all 0.3s ease;
//     }
//   }

//   &:active {
//     transform: translateY(0);
//     box-shadow: 0 2px 4px rgba(136, 0, 251, 0.2);
//   }

//   @media (max-width: 768px) {
//     width: 110px;
//     height: 38px;
//     font-size: 0.85rem;
//   }
// `;

// const BillCategory = styled.span`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   z-index: 1;
//   color: #fff;
//   font-size: 1.5rem;
//   font-weight: 500;
//   /* background-color: rgba(0, 0, 0, 0.1); */
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;
