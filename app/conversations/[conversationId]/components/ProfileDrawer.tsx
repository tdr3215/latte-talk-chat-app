import useOtherUser from "@/app/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import { format } from "date-fns";
import React, { Fragment, useMemo, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoClose, IoTrash } from "react-icons/io5";
import Avatar from "@/app/components/Avatar";
import ConfirmModal from "@/app/components/ConfirmModal";
import AvatarGroup from "@/app/components/AvatarGroup";
interface ProfileDrawerProps {
  data: Conversation & { users: User[] };
  isOpen: boolean;
  onClose: () => void;
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
  data,
  isOpen,
  onClose,
}) => {
  const otherUser = useOtherUser(data);
  const [confirmOpen, setConfirmOpen] = useState(false);
  //   Date Joined
  const joinedDate = useMemo(() => {
    return format(new Date(otherUser.createdAt), "PP");
  }, [otherUser.createdAt]);
  // Title
  const title = useMemo(() => {
    return data.name || otherUser.name;
  }, [data.name, otherUser.name]);

  // Status Text
  const statusText = useMemo(() => {
    if (data.isGroup) {
      return `${data.users.length} members`;
    }
    return "Active";
  }, [data]);
  return (
    <>
      <ConfirmModal
        aria-modal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
      />

      <Transition show={isOpen} as={Fragment}>
        <Dialog as="div" className={"relative z-50"} onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-40" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel
                    className={"pointer-events-auto w-screen max-w-md"}
                  >
                    <div className="flex h-full flex-col overflow-y-scroll bg-secondary py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-end">
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              onClick={onClose}
                              type="button"
                              className="
                            rounded-md bg-neutral text-neutral-content hover:opacity-75 
                            focus:outline-none focus:ring-2 focus:ring-neutral
                            focus:ring-offset-2
                            
                            "
                            >
                              <span className="sr-only"> Close Panel</span>
                              <IoClose size={24} />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        <div className="flex flex-col items-center">
                          <div className="mb-2">
                            {data.isGroup ? (
                              <AvatarGroup users={data.users} />
                            ) : (
                              <Avatar user={otherUser} />
                            )}
                          </div>
                          <div className="text-base-content">{title}</div>
                          <div className="text-sm text-neutral-content">
                            {statusText}
                          </div>
                          <div className="flex gap-10 my-8">
                            <div className="flex flex-col gap-3 items-center cursor-pointer hover:opacity-75">
                              <div
                                className="w-10 h-10 bg-neutral text-neutral-content rounded-full flex items-center justify-center"
                                onClick={() => setConfirmOpen(true)}
                              >
                                <IoTrash size={20} />
                              </div>
                              <div className="text-sm font-light text-neutral-content">
                                Delete
                              </div>
                            </div>
                          </div>
                          <div className="w-full pb-5 pt-5 sm:px-0 sm:pt-0">
                            <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
                              {data.isGroup && (
                                <div>
                                  <dt className="text-sm font-medium text-base-content sm:w-40 sm:flex-shrink-0">
                                    Emails
                                  </dt>
                                  <dd className="mt-1 text-sm text-neutral-content sm:col-span-2">
                                    {data.users
                                      .map((user) => user.email)
                                      .join(", ")}
                                  </dd>
                                </div>
                              )}

                              {!data.isGroup && (
                                <div>
                                  <dt className="text-sm font-medium text-base-content sm:w-40 sm:flex-shrink-0">
                                    Email
                                  </dt>
                                  <dd className="mt-1 text-sm text-neutral-content sm:col-span-2">
                                    {otherUser.email}
                                  </dd>
                                </div>
                              )}
                              {!data.isGroup && (
                                <>
                                  <hr />
                                  <div>
                                    <dt className="text-sm font-medium text-base-content sm:w-40 sm:flex-shrink-0">
                                      Joined
                                    </dt>
                                    <dd className="mt-1 text-sm text-neutral-content sm:col-span-2">
                                      <time dateTime={joinedDate}>
                                        {joinedDate}
                                      </time>
                                    </dd>
                                  </div>
                                </>
                              )}
                            </dl>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ProfileDrawer;
