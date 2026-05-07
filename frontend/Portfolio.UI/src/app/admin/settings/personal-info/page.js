"use client";

import classes from "./PersonalInfo.module.css";
import Input from "@/app/components/Input/Input";
import Button from "@/app/components/Button/Button";
import TextArea from "@/app/components/TextArea/TextArea";
import { UploadCloud, FileText } from "lucide-react";
import Image from "next/image";
import { useGetPersonalInfos } from "@/hooks/GET/useGetPersonalInfos";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePutPersonalInfos } from "@/hooks/PUT/usePutPersonalInfos";

export default function PersonalInfo() {
  const router = useRouter();
  const [token, setToken] = useState(null);
  useEffect(() => {
    const currentToken = localStorage.getItem("token");
    setToken(currentToken);
    if (!currentToken) {
      router.replace("/login");
      return;
    }
  }, [router]);

  const {
    data: getPersonalInfosData,
    isLoading: getPersonalInfosIsLoading,
    isError: getPersonalInfosIsError,
    error: getPersonalInfosError,
  } = useGetPersonalInfos(token);
  const {
    mutate: putPersonalInfosMutate,
    isPending: putPersonalInfosIsPending,
    isError: putPersonalInfosIsError,
    error: putPersonalInfosError,
  } = usePutPersonalInfos();
  const [input, setInput] = useState({
    name: {
      letters: "",
      isBlur: false,
    },
    surname: {
      letters: "",
      isBlur: false,
    },
    title: {
      letters: "",
      isBlur: false,
    },
    about: {
      letters: "",
      isBlur: false,
    },
  });

  useEffect(() => {
    if (getPersonalInfosData) {
      setInput({
        name: { letters: getPersonalInfosData?.result?.name, isBlur: false },
        surname: {
          letters: getPersonalInfosData?.result?.surname,
          isBlur: false,
        },
        title: { letters: getPersonalInfosData?.result?.title, isBlur: false },
        about: { letters: getPersonalInfosData?.result?.about, isBlur: false },
      });
    }
  }, [getPersonalInfosData]);

  function changeHandler(event) {
    const { name, value } = event.target;
    setInput((prev) => ({
      ...prev,
      [name]: { ...prev[name], letters: value },
    }));
  }

  function submitHandler(event) {
    event.preventDefault();
    putPersonalInfosMutate(
      {
        token: token,
        body: {
          name: input.name.letters,
          surname: input.surname.letters,
          title: input.title.letters,
          about: input.about.letters,
        },
      },
      {
        onSuccess: (data) => console.log(data.result),
        onError: (err) => console.log(err.message),
      },
    );
  }

  return (
    <div className={classes.div}>
      <h1 className={classes.pageTitle}>Personal Informations</h1>
      <div className={classes.formWrapper}>
        <form onSubmit={submitHandler} className={classes.gridContainer}>
          <div className={classes.mediaColumn}>
            <div className={classes.avatarSection}>
              <div className={classes.avatarPreview}>
                <Image
                  src="/pp.png"
                  alt="profile"
                  width={150}
                  height={150}
                  priority
                />
                <div className={classes.uploadOverlay}>
                  <UploadCloud />
                </div>
              </div>
              <input type="file" className={classes.hiddenInput} />
            </div>
            <div className={classes.cvSection}>
              <h4>CURRENT CV</h4>
              <div className={classes.cvBox}>
                <FileText className={classes.cvIcon} />
                <span>selim_cv.pdf</span>
              </div>
              <Button type="button" className={classes.cvUploadBtn}>
                Upload New CV
              </Button>
            </div>
          </div>
          <div className={classes.textColumn}>
            <div className={classes.row}>
              <div className={classes.labelInput}>
                <label>Name</label>
                <Input
                  type="text"
                  name="name"
                  onChange={changeHandler}
                  value={input.name.letters}
                />
              </div>
              <div className={classes.labelInput}>
                <label>Surname</label>
                <Input
                  type="text"
                  name="surname"
                  onChange={changeHandler}
                  value={input.surname.letters}
                />
              </div>
            </div>
            <div className={classes.labelInput}>
              <label>Title</label>
              <Input
                type="text"
                name="title"
                onChange={changeHandler}
                value={input.title.letters}
              />
            </div>
            <div className={classes.labelInput}>
              <label>About Me</label>
              <TextArea
                rows={6}
                name="about"
                onChange={changeHandler}
                value={input.about.letters}
              />
            </div>
            <div className={classes.submitContainer}>
              <Button type="submit" disabled={putPersonalInfosIsPending}>
                {putPersonalInfosIsPending ? "Updating..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
