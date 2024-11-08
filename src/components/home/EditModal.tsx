import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import {
  CTA_button_med,
  Desc_120_med,
  Main_title_med,
  Noto_Receipt,
} from 'styles/typography';
import useImage from 'hooks/useImage';
import default_profile from '../../assets/images/default-profile.svg';
import { ReactComponent as CheckIcon } from '../../assets/icons/circle-check.svg';

const Container = styled.div`
  width: 360px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  z-index: 1000;
`;

const ModalBox = styled.div`
  width: 328px;
  height: 655px;
  background-color: #fff;
  border: none;
  border-radius: 16px;
  padding: 16px;
`;

const CloseBtn = styled.text`
  display: flex;
  justify-content: end;
  cursor: pointer;
  margin: 8px 8px 15px 0;
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  margin-bottom: 28px;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  margin-bottom: 26px;
`;

const ImageBox = styled.img`
  width: 104px;
  height: 104px;
  border: none;
  border-radius: 100%;
`;

const HiddenBtn = styled.input`
  display: none;
`;

const BtnBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const Text = styled.div`
  text-decoration: underline;
  text-underline-offset: 2px;
  cursor: pointer;
`;

const Btn = styled.div<{ isError: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 48px;
  background-color: black;
  color: white;
  margin-top: ${(props) => (props.isError ? '32px' : '48px')};
  cursor: pointer;
`;

const NicknameInputBox = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

const IdInputBox = styled.div`
  width: 100%;
  margin-bottom: 31px;
`;

const InputTitleBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Input = styled.input`
  width: 100%;
  border: none;
  outline: none;
  font-family: 'Noto_Med';
  font-size: 12px;
  line-height: 150%;
  letter-spacing: -0.96px;
  height: 48px;
  background-color: #fbfbfb;
  margin-top: 12px;
  padding-left: 14px;
  &::placeholder {
    color: #9f9f9f;
  }
`;

const CheckBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: end;
  gap: 6px;
  margin: 6px 0 10px 0;
`;

const Check = styled.div<{ isChecked: boolean }>`
  display: flex;
  flex-direction: row;
  gap: 2px;
  color: ${(props) => (props.isChecked ? '#000000' : '#9f9f9f')};
  .check {
    stroke: ${(props) => (props.isChecked ? '#000000' : '#9f9f9f')};
  }
`;

const DuplicateCheck = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
`;

const ErrorBox = styled.div<{ isSeen: boolean }>`
  color: #ff6347;
  display: ${(props) => (props.isSeen ? 'block' : 'none')};
`;

const TextBtn = styled.div<{ isChecked: boolean }>`
  text-decoration: underline;
  text-underline-offset: 2px;
  color: ${(props) => (props.isChecked ? '#000000' : '#9f9f9f')};
  cursor: pointer;
`;

type EditModalProps = {
  closeModal: () => void;
};

export default function EditModal({ closeModal }: EditModalProps) {
  const [imgFile, setImgFile] = useState<string>('');
  const fileRef = useRef<HTMLInputElement>(null);
  const { handleClick, changeFile } = useImage({ setImgFile, fileRef });

  //유효성 검사
  const [nickname, setNickname] = useState<string>('');
  const [isNickname, setIsNickname] = useState<boolean>(false);
  const [id, setId] = useState<string>('');
  const regEng = /[a-zA-Z]/;
  const regNum = /[0-9]/;
  const regSpe = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/;
  const resExc = /[^a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~ ]/g;
  const [isEng, setIsEng] = useState<boolean>(false);
  const [isNum, setIsNum] = useState<boolean>(false);
  const [isSpe, setIsSpe] = useState<boolean>(false);
  const [isLong, setIsLong] = useState<boolean>(false);
  const [isExc, setIsExc] = useState<boolean>(false);
  const [isOnly, setIsOnly] = useState<boolean>(false);
  const [isErrorSeen, setIsErrorSeen] = useState<boolean>(false);

  //닉네임 20이내로
  useEffect(() => {
    if (nickname.length > 0 && nickname.length <= 20) {
      setIsNickname(true);
    } else {
      setIsNickname(false);
    }
  }, [nickname]);

  //영문, 숫자, 특수문자 포함. 6-12자
  useEffect(() => {
    if (id.length >= 6 && id.length <= 12) {
      setIsLong(true);
    } else {
      setIsLong(false);
    }

    if (regEng.test(id)) {
      setIsEng(true);
    } else {
      setIsEng(false);
    }

    if (regNum.test(id)) {
      setIsNum(true);
    } else {
      setIsNum(false);
    }

    if (regSpe.test(id)) {
      setIsSpe(true);
    } else {
      setIsSpe(false);
    }

    if (id.match(resExc) == undefined) {
      setIsExc(true);
    } else {
      setIsExc(false);
    }
  }, [id]);

  return (
    <Container>
      <ModalBox>
        <CloseBtn onClick={closeModal}>
          <CTA_button_med>닫기</CTA_button_med>
        </CloseBtn>
        <TitleBox>
          <Main_title_med>프로필 설정하기</Main_title_med>
          <Desc_120_med>다른 사용자에게 보여질 프로필이예요.</Desc_120_med>
        </TitleBox>
        <Box>
          <ImageBox src={imgFile == '' ? default_profile : imgFile} />
          <HiddenBtn
            type="file"
            accept="image/*"
            ref={fileRef}
            onChange={changeFile}
          />
          <BtnBox>
            <Text onClick={handleClick}>
              <Desc_120_med>사진 선택</Desc_120_med>
            </Text>
            <Text onClick={() => setImgFile('')}>
              <Desc_120_med>기본이미지</Desc_120_med>
            </Text>
          </BtnBox>
        </Box>
        <NicknameInputBox>
          <InputTitleBox>
            <CTA_button_med>닉네임</CTA_button_med>
            <Desc_120_med>
              다른 유저에게 보여질 닉네임을 20자 이내로 작성해주세요.
            </Desc_120_med>
          </InputTitleBox>
          <Input
            type="text"
            placeholder="닉네임을 입력해주세요"
            onChange={(e) => setNickname(e.target.value)}
            value={nickname}
          />
        </NicknameInputBox>
        <IdInputBox>
          <InputTitleBox>
            <CTA_button_med>아이디</CTA_button_med>
            <Desc_120_med>
              룩북 커뮤니티에서 사용할 아이디를 입력해주세요.
            </Desc_120_med>
            <ErrorBox isSeen={isErrorSeen}>
              {!isExc ? (
                <Noto_Receipt>
                  영어, 숫자, 특수문자만 입력할 수 있습니다. (6-12)
                </Noto_Receipt>
              ) : !isOnly ? (
                <Noto_Receipt>중복된 아이디입니다.</Noto_Receipt>
              ) : (
                <></>
              )}
            </ErrorBox>
          </InputTitleBox>
          <Input
            type="text"
            placeholder="아이디를 입력해주세요"
            onChange={(e) => setId(e.target.value)}
            value={id}
          />
          <CheckBox>
            <Check isChecked={isEng}>
              <CheckIcon />
              <Desc_120_med>영문</Desc_120_med>
            </Check>
            <Check isChecked={isNum}>
              <CheckIcon />
              <Desc_120_med>숫자</Desc_120_med>
            </Check>
            <Check isChecked={isSpe}>
              <CheckIcon />
              <Desc_120_med>특수문자</Desc_120_med>
            </Check>
            <Check isChecked={isLong}>
              <CheckIcon />
              <Desc_120_med>6~12자</Desc_120_med>
            </Check>
          </CheckBox>
          <DuplicateCheck>
            <TextBtn
              isChecked={isOnly}
              onClick={(e) => {
                !(isEng && isNum && isSpe && isLong)
                  ? e.preventDefault
                  : //api연결시 조건 충족하면 data 넘기기
                    setIsErrorSeen(true);
              }}
            >
              <Desc_120_med>중복확인</Desc_120_med>
            </TextBtn>
          </DuplicateCheck>
        </IdInputBox>
        <Btn isError={isErrorSeen}>
          <CTA_button_med>변경하기</CTA_button_med>
        </Btn>
      </ModalBox>
    </Container>
  );
}
