type UseImageProps = {
  setImgFile: React.Dispatch<React.SetStateAction<string>>;
  fileRef: React.RefObject<HTMLInputElement>;
};

export default function useImage({ setImgFile, fileRef }: UseImageProps) {
  const handleClick = () => {
    fileRef?.current?.click();
  };
  const changeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetFile = e.target.files?.[0];
    if (targetFile !== undefined) {
      setImgFile(URL.createObjectURL(targetFile));
    }
  };

  return {
    handleClick,
    changeFile,
  };
}