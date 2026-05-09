"use client";

import Input from "@/app/components/Input/Input";
import classes from "./PageSettings.module.css";
import TextArea from "@/app/components/TextArea/TextArea";
import Button from "@/app/components/Button/Button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { usePutSiteSettings } from "@/hooks/PUT/usePutSiteSettings";
import { useGetSiteSettings } from "@/hooks/GET/useGetSiteSettings";

export default function PageSettings() {
  const router = useRouter();
  const [input, setInput] = useState({
    siteTitle: {
      letters: "",
      isBlur: false,
    },
    siteDescription: {
      letters: "",
      isBlur: false,
    },
    gitHubUrl: {
      letters: "",
      isBlur: false,
    },
    linkedInUrl: {
      letters: "",
      isBlur: false,
    },
  });
  const [token, setToken] = useState(null);
  useEffect(() => {
    const currentToken = localStorage.getItem("token");
    setToken(currentToken);
    if (!currentToken) {
      router.replace("/admin/login");
      return;
    }
  }, [router]);
  const {
    data: getSiteSettingsData,
    isLoading: getSiteSettingsIsLoading,
    isError: getSiteSettingsIsError,
    error: getSiteSettingsError,
  } = useGetSiteSettings(token);
  const {
    mutate: putSiteSettingsMutate,
    isPending: putSiteSettingsIsPending,
    isError: putSiteSettingsIsError,
    error: putSiteSettingsError,
  } = usePutSiteSettings();

  useEffect(() => {
    if (getSiteSettingsData?.result?.data) {
      const siteData = getSiteSettingsData.result.data;
      setInput({
        siteTitle: {
          letters: siteData.siteTitle || "",
          isBlur: false,
        },
        siteDescription: {
          letters: siteData.siteDescription || "",
          isBlur: false,
        },
        gitHubUrl: {
          letters: siteData.gitHubUrl || "",
          isBlur: false,
        },
        linkedInUrl: {
          letters: siteData.linkedInUrl,
          isBlur: false,
        },
      });
    }
  }, [getSiteSettingsData]);

  function changeHandler(event) {
    const { name, value } = event.target;
    setInput((prev) => ({
      ...prev,
      [name]: { ...prev[name], letters: value },
    }));
  }

  function submitHandler(event) {
    event.preventDefault();
    putSiteSettingsMutate(
      {
        token: token,
        body: {
          siteTitle: input.siteTitle.letters,
          siteDescription: input.siteDescription.letters,
          gitHubUrl: input.gitHubUrl.letters,
          linkedInUrl: input.linkedInUrl.letters,
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
      <div className={classes.pageHeaderContainer}>
        <h1 className={classes.pageHeader}>Page Settings</h1>
      </div>
      <div className={classes.formWrapper}>
        <form onSubmit={submitHandler} className={classes.form}>
          <div className={classes.fullWidth}>
            <div className={classes.labelInput}>
              <label>Site Title</label>
              <Input
                name="siteTitle"
                onChange={changeHandler}
                value={input.siteTitle.letters}
                placeholder="Enter your page title..."
              />
            </div>
          </div>
          <div className={classes.pageDescriptionContainer}>
            <div className={classes.labelInput}>
              <label>Site Description</label>
              <TextArea
                className={classes.pageDescription}
                name="siteDescription"
                onChange={changeHandler}
                value={input.siteDescription.letters}
                placeholder="Write a brief description..."
              />
            </div>
          </div>
          <div className={classes.socialMediaContainer}>
            <div className={classes.labelInput}>
              <label>GitHub</label>
              <Input
                name="gitHubUrl"
                onChange={changeHandler}
                value={input.gitHubUrl.letters}
                placeholder="GitHub profile link"
                autoComplete="on"
              />
            </div>
            <div className={classes.labelInput}>
              <label>LinkedIn</label>
              <Input
                name="linkedInUrl"
                onChange={changeHandler}
                value={input.linkedInUrl.letters}
                placeholder="LinkedIn profile link"
                autoComplete="on"
              />
            </div>
            <div className={classes.buttonArea}>
              <Button type="submit" disabled={putSiteSettingsIsPending}>
                {putSiteSettingsIsPending ? "Updating..." : "Update Settings"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
