import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";
import type React from "react";
import Button from "../button";
import { cn } from "../../../utils/cn";
import { Fragment } from "react";

interface SideBarDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  isLoading?: boolean;
  onSubmit?: () => void;
  submitText?: string;
  cancelText?: string;
  disableSubmit?: boolean;
  className?: string;
  statusActions?: {
    text: string;
    variant: "primary" | "danger" | "confirme";
    onClick: () => void;
    disabled?: boolean;
    className?: string;
  }[];
}

const SidebarDialog = ({
  open,
  onClose,
  title,
  children,
  onSubmit,
  disableSubmit,
  isLoading,
  submitText = "Confirm",
  cancelText = "Cancel",
  className,
  statusActions,
}: SideBarDialogProps) => {
  return (
    <>
      <Dialog open={open} onClose={() => {}}>
        <Transition
          show={open}
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <DialogBackdrop className="fixed inset-0 bg-black/50 z-[400]" />
        </Transition>

        <div className="fixed z-[500] inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex md:max-w-full max-w-xs">
              <Transition show={open}>
                <DialogPanel
                  className={cn(
                    "pointer-events-auto relative w-screen lg:max-w-xl md:max-w-lg max-w-xs bg-white shadow-xl flex flex-col h-full transition-transform duration-300 ease-in-out",
                    "data-[enter]:translate-x-full data-[open]:translate-x-0 data-[leave]:translate-x-0 data-[closed]:translate-x-full",
                  )}
                >
                  <div className="flex-1 overflow-auto md:p-8 p-4 md:pb-sp100 pb-sp54">
                    <div className={cn(`md:mb-9 mb-3`, className)}>
                      <DialogTitle className="md:text-2xl/6 text-base font-extrabold">
                        {title}
                      </DialogTitle>
                    </div>
                    {children}
                  </div>

                  <div className="absolute bottom-0 left-0 bg-white w-full border-t md:p-4 px-4 py-2 flex gap-4 z-10">
                    <div className="flex w-full justify-between">
                      <Button
                        text={cancelText}
                        backgroundColor="transparent"
                        onClick={onClose}
                        className="border-primary border-0.5 md:px-11 px-6 md:py-sp14 py-sp9 md:text-xl text-base font-medium"
                      />
                      {onSubmit && (
                        <Button
                          text={submitText}
                          onClick={onSubmit}
                          className={`md:px-11 px-6 md:py-sp14 py-sp9 font-medium md:text-xl text-base ${
                            disableSubmit ? "opacity-50" : "opacity-100"
                          }`}
                          disabled={disableSubmit}
                          isLoading={isLoading}
                        />
                      )}
                      {/* Status Button */}
                      {statusActions?.length ? (
                        <div className="flex gap-3">
                          {statusActions.map((action, index) => {
                            return (
                              <Button
                                key={index}
                                text={action.text}
                                disabled={action.disabled}
                                onClick={action.onClick}
                                className={cn(
                                  "md:px-6 px-4 md:py-sp14 py-sp9 md:text-xl text-base font-medium",
                                  action.variant === "primary"
                                    ? "bg-primary text-black"
                                    : action.variant === "confirme"
                                      ? "bg-green-400 text-black"
                                      : "bg-red-400 text-black",
                                  action.disabled &&
                                    "opacity-50 cursor-not-allowed",
                                )}
                              />
                            );
                          })}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </DialogPanel>
              </Transition>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default SidebarDialog;
