'use client';

import { Form } from '@/components';
import Button from '@/components/Button/Button';
import { useState, ChangeEvent, useEffect } from 'react';
import { SubmitHandler, useForm, FieldValues } from 'react-hook-form';
import styled from 'styled-components';
import { PostRatingType } from '@/constants/Main/index';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { getVipRatingsAtom, vipsAtom, writeRatingAtom } from '../../atom';
import {
  accessTokenAtom,
  getReissueTokenAtom,
  getTokenAtom
} from '@/modules/auth/atoms';
import { toast } from 'react-toastify';
import { getReissueToken } from '@/modules/auth/fetch';

const Rating = ({ vipId }: { vipId: string }) => {
  const router = useRouter();

  const form = useForm<PostRatingType>();
  const {
    formState: { errors }
  } = form;

  const [isOpen, setIsopen] = useState(false);
  const [rating, setRating] = useState(5);

  const writeRating = useSetAtom(writeRatingAtom);
  const getReissueToken = useSetAtom(getReissueTokenAtom);
  const getVipRatings = useSetAtom(getVipRatingsAtom);
  const token = useAtomValue(accessTokenAtom);
  const [vips, setVips] = useAtom(vipsAtom);

  const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRating(parseFloat(e.target.value));
  };

  const writeHandler: SubmitHandler<PostRatingType> = async (data) => {
    const body = {
      ...data,
      congressmanId: vipId
    };
    try {
      await writeRating({ body });
      await getVipRatings({ params: vipId });
      setVips((prev) => ({
        ...prev,
        congressmanList: prev.congressmanList.map((vip) => {
          if (vip.id !== vipId) return vip;

          const updatedRate =
            typeof vip.rate === 'number' ? vip.rate + rating : rating;

          return {
            ...vip,
            rate: updatedRate
          };
        })
      }));
      // 토큰 재발
      // const res = await getReissueToken({ body: {} });

      toast.success('소중한 평가 감사합니다!');
    } catch (err) {
      toast.error('이미 평가를 작성하셨습니다. 😀');
    } finally {
      form.reset({
        rating: 5,
        content: ''
      });
      setIsopen(false);
    }
  };

  //

  return (
    <Wrapper>
      <ButtonWrapper
        onClick={() => {
          if (!token && !token.length) {
            toast.warning('로그인 후 평가를 남길 수 있어요!');
            return;
          }
          setIsopen(true);
        }}
      >
        <TitleWrapper>
          ✍🏻 <Title>국회의원 평가</Title>
        </TitleWrapper>

        {!isOpen && <Button name="Go" size="s" />}
      </ButtonWrapper>
      {isOpen && (
        <Form form={form}>
          <MainSection>
            <ScoreWrap>
              <StarImg src="/test/iconStar.png" />
              <Span>별점 : </Span>
              <Score>{rating} / 10</Score>
            </ScoreWrap>
            <ScoreRadio
              type="range"
              min="1"
              max="10"
              step="0.1"
              value={rating}
              {...form.register('rating', {
                required: '별점을 선택해주세요.',
                min: 1,
                max: 10
              })}
              onChange={handleSliderChange}
              style={{ width: '100%', marginBottom: '20px' }}
            />
            <TextAreaWrapper>
              <TextArea
                placeholder="자유롭게 작성해주세요."
                {...form.register('content', {
                  required: ' 필수값입니다.',
                  minLength: {
                    value: 2,
                    message: '최소 2글자입니다!'
                  }
                })}
              />
              {errors?.content?.message && (
                <ErrMessage>*{errors?.content?.message}</ErrMessage>
              )}
              <SubmitBtnWrapper>
                <Button
                  name="닫기"
                  bg="#00ba5c"
                  size="m"
                  onClick={() => setIsopen(false)}
                />
                <Button
                  name="전송"
                  bg="#8800fb"
                  size="m"
                  type="submit"
                  onClick={form.handleSubmit(writeHandler)}
                />
              </SubmitBtnWrapper>
            </TextAreaWrapper>
          </MainSection>
        </Form>
      )}
    </Wrapper>
  );
};

export default Rating;

const ErrMessage = styled.span`
  width: 100%;
  max-width: 450px;
  text-align: start;
  color: crimson;
  font-size: 14px;
  margin-top: 10px;
  padding-left: 9px;
`;
const Span = styled.span``;
const StarImg = styled.img`
  display: inline-block;
  width: 0.8rem;
  height: 0.8rem;
  margin-right: 10px;
`;
const Wrapper = styled.div`
  display: flex;
  box-sizing: border-box;
  background-color: #8800fb;
  border-radius: 20px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid #ededed;
  border-radius: 12px;
  margin: 0 auto;
  margin-top: 1rem;
  width: 95%;
  padding: 0 1.5rem;
  flex-direction: column;
  padding-bottom: 2rem;
  background-color: #ffffff;
  border-radius: 17px;
  padding: 1rem;
  cursor: pointer;
`;

const Title = styled.p`
  color: #000000;
  font-size: 20px;
  font-weight: 500;
  flex: 1;
  margin-left: 0.5rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ScoreWrap = styled.div`
  color: #8800fb;
  font-weight: 700;
  margin-top: 1rem;
`;
const Score = styled.span``;

const ScoreRadio = styled.input.attrs({ type: 'range' })`
  appearance: none;
  -webkit-appearance: none;
  width: 100%;
  margin-bottom: 20px;

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 15px;
    background: #d8b4ff;
    border-radius: 5px;
  }

  &::-webkit-slider-thumb {
    appearance: none;
    -webkit-appearance: none;
    width: 25px;
    height: 25px;
    background: #8800fb;
    border-radius: 50%;
    cursor: pointer;
    margin-top: -5.5px;
  }

  &::-moz-range-track {
    width: 100%;
    height: 8px;
    background: #d8b4ff;
    border-radius: 5px;
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background: #6c63ff;
    border-radius: 50%;
    cursor: pointer;
  }
`;

const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TextAreaWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 9.3rem;
  box-sizing: border-box;
  font-size: 1rem;
  border: none; /* 기본 보더 제거 */
  outline: none;
  padding: 1rem;
  box-shadow: 0px 0px 4px rgba(3, 3, 3, 0.2);
  resize: none;

  &::placeholder {
    color: #cbb3e5;
  }
`;

const SubmitBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  gap: 10px;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;
const Pen = styled.img`
  display: block;
  width: 20px;
  height: 20px;
`;
