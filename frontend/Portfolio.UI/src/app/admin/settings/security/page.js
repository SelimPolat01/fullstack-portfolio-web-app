"use client";

import Input from "@/app/components/Input/Input";
import classes from "./Security.module.css";
import { AlertTriangle, Clock, KeyRound, Mail } from "lucide-react";
import Button from "@/app/components/Button/Button";
import { usePutPassword } from "@/hooks/PUT/usePutPassword";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useGetEmail } from "@/hooks/GET/useGetEmail";
import { usePutEmail } from "@/hooks/PUT/usePutEmail";
import { useDeleteAccount } from "@/hooks/DELETE/useDeleteAccount";
import { AnimatePresence } from "framer-motion";
import ConfirmModal from "@/app/components/ConfirmModal/ConfirmModal";

export default function Security() {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [accountDelete, setAccountDelete] = useState(false);
  const dialogRef = useRef();
  useEffect(() => {
    const currentToken = localStorage.getItem("token");
    setToken(currentToken);
    if (!currentToken) {
      router.replace("/admin/login");
      return;
    }
  }, [router]);

  const [input, setInput] = useState({
    currentEmail: "",
    email: {
      letters: "",
      isBlur: false,
    },
    confirmEmail: {
      letters: "",
      isBlur: false,
    },
    currentPassword: {
      letters: "",
      isBlur: false,
    },
    password: {
      letters: "",
      isBlur: false,
    },
    confirmPassword: {
      letters: "",
      isBlur: false,
    },
  });

  const {
    data: getEmailData,
    isLoading: getEmailIsLoading,
    isError: getEmailIsError,
    error: getEmailError,
  } = useGetEmail(token);

  useEffect(() => {
    if (getEmailData) {
      setInput((prev) => ({
        ...prev,
        currentEmail: getEmailData?.result?.email || "",
      }));
    }
  }, [getEmailData]);

  const {
    mutate: putPasswordMutate,
    isPending: putPasswordIsPending,
    isError: putPasswordIsIsError,
    error: putPasswordError,
  } = usePutPassword();

  const {
    mutate: putEmailMutate,
    isPending: putEmailIsPending,
    isError: putEmailIsIsError,
    error: putEmailError,
  } = usePutEmail();

  const {
    mutate: deleteAccountMutate,
    isPending: deleteAccountIsPending,
    isError: deleteAccountIsError,
    error: deleteAccountError,
  } = useDeleteAccount();

  function changeHandler(event) {
    const { name, value } = event.target;
    setInput((prev) => ({
      ...prev,
      [name]: { ...prev[name], letters: value },
    }));
  }

  function passwordSubmitHandler(event) {
    event.preventDefault();

    putPasswordMutate(
      {
        token: token,
        body: {
          currentPassword: input.currentPassword.letters,
          password: input.password.letters,
          confirmPassword: input.confirmPassword.letters,
        },
      },
      {
        onSuccess: () =>
          setInput((prev) => ({
            ...prev,
            currentPassword: { letters: "", isBlur: false },
            password: { letters: "", isBlur: false },
            confirmPassword: { letters: "", isBlur: false },
          })),
        onError: (err) => console.log(err.message),
      },
    );
  }

  function emailSubmitHandler(event) {
    event.preventDefault();
    putEmailMutate(
      {
        token: token,
        body: {
          email: input.email.letters,
        },
      },
      {
        onSuccess: (data) => {
          setInput((prev) => ({
            ...prev,
            currentEmail: data?.result?.email,
            email: { letters: "", isBlur: false },
            confirmEmail: { letters: "", isBlur: false },
          }));
        },
        onError: (err) => console.log(err.message),
      },
    );
  }

  function accountDeleteSubmitHandler(event) {
    event.preventDefault();
    setAccountDelete(true);
  }

  function confirmDeleteHandler() {
    if (!accountDelete) return;
    deleteAccountMutate(
      { token: token },
      {
        onSuccess: (data) => {
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          router.replace("/admin/login");
        },
        onError: (err) => console.log(err.message),
      },
    );
  }

  function cancelDeleteHandler() {
    dialogRef.current.close();
    setAccountDelete(false);
  }

  return (
    <div className={classes.div}>
      <AnimatePresence>
        <ConfirmModal
          isOpen={!!accountDelete}
          text="Are you sure you would like to do this?"
          title="Delete"
          onConfirm={confirmDeleteHandler}
          onCancel={cancelDeleteHandler}
          ref={dialogRef}
        />
      </AnimatePresence>
      <h1 className={classes.pageTitle}>Security Settings</h1>
      <div className={classes.settingsContainer}>
        <div className={classes.settingBlock}>
          <div className={classes.blockInfo}>
            <h3>
              <Mail size={20} className={classes.icon} /> Account Email
            </h3>
            <p>
              Update the email address used for your account login and
              notifications.
            </p>
          </div>
          <form onSubmit={emailSubmitHandler} className={classes.blockForm}>
            <div className={classes.labelInput}>
              <label>Current Email Address</label>
              <Input
                disabled
                type="email"
                name="currentEmail"
                value={input.currentEmail}
              />
            </div>
            <div className={classes.labelInput}>
              <label>New Email Address</label>
              <Input
                type="email"
                name="email"
                value={input.email.letters}
                onChange={changeHandler}
              />
            </div>
            <div className={classes.labelInput}>
              <label>Confirm Email Address</label>
              <Input
                type="email"
                name="confirmEmail"
                value={input.confirmEmail.letters}
                onChange={changeHandler}
              />
            </div>
            <div className={classes.submitContainer}>
              <Button disabled={putEmailIsPending} type="submit">
                {putEmailIsPending ? "Updating..." : "Save Emaila"}
              </Button>
            </div>
          </form>
        </div>
        <div className={classes.settingBlock}>
          <div className={classes.blockInfo}>
            <h3>
              <KeyRound size={20} className={classes.icon} /> Update Password
            </h3>
            <p>
              Ensure your account is using a strong, long, and random password
              to stay secure.
            </p>
          </div>
          <form onSubmit={passwordSubmitHandler} className={classes.blockForm}>
            <div className={classes.labelInput}>
              <label>Current Password</label>
              <Input
                type="password"
                name="currentPassword"
                value={input.currentPassword.letters}
                onChange={changeHandler}
              />
            </div>
            <div className={classes.row}>
              <div className={classes.labelInput}>
                <label>New Password</label>
                <Input
                  type="password"
                  name="password"
                  value={input.password.letters}
                  onChange={changeHandler}
                />
              </div>
              <div className={classes.labelInput}>
                <label>Confirm Password</label>
                <Input
                  type="password"
                  name="confirmPassword"
                  value={input.confirmPassword.letters}
                  onChange={changeHandler}
                />
              </div>
            </div>
            <div className={classes.submitContainer}>
              <Button disabled={putPasswordIsPending} type="submit">
                {putPasswordIsPending ? "Updating..." : "Update Password"}
              </Button>
            </div>
          </form>
        </div>
        <div className={classes.settingBlock}>
          <div className={classes.blockInfo}>
            <h3>
              <Clock size={20} className={classes.icon} /> Session Settings
            </h3>
            <p>
              Adjust how long you stay logged in before needing to authenticate
              again.
            </p>
          </div>
          <div className={classes.blockForm}>
            <div className={classes.labelInput}>
              <label>Token Expiration (Days)</label>
              <Input type="number" name="tokenDuration" min="1" max="30" />
            </div>
            <div className={classes.submitContainer}>
              <Button type="button">Save Settings</Button>
            </div>
          </div>
        </div>
        <div className={`${classes.settingBlock} ${classes.dangerZone}`}>
          <div className={classes.blockInfo}>
            <h3 className={classes.dangerText}>
              <AlertTriangle size={20} /> Danger Zone
            </h3>
            <p>Irreversible actions related to your account and data.</p>
          </div>
          <form
            onSubmit={accountDeleteSubmitHandler}
            className={classes.blockForm}
          >
            <div className={classes.dangerBox}>
              <div>
                <h4>Delete Account</h4>
                <p>
                  Permanently delete your account, projects, and messages. This
                  action cannot be undone.
                </p>
              </div>
              <Button
                disabled={deleteAccountIsPending}
                type="submit"
                className={classes.dangerBtn}
              >
                {deleteAccountIsPending ? "Deleting ..." : "Delete Account"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
