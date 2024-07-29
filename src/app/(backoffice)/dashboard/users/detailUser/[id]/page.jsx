"use client";

import request from "@/app/utils/request";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaPhone } from "react-icons/fa6";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { MdEmail } from "react-icons/md";

export default function DetailUser({ params }) {
  const router = useRouter();
  const id = params.id;

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("email");
  const [phone, setPhone] = useState("123");
  const [avatar, setAvatar] = useState();
  const [avatarUrl, setAvatarUrl] = useState("https://placehold.co/100x100");
  const [roleId, setRoleId] = useState("2");
  const [typeInput, setTypeInput] = useState(true);

  // useEffect(() => {
  //   if (!id) {
  //     router.push("/dashboard/users");
  //     return;
  //   }
  //   request
  //     .get(`users/${id}`)
  //     .then(function (response) {
  //       const data = response.data.data;
  //       if (!data) {
  //         router.push("/dashboard/users");
  //         return;
  //       }
  //       setName(data.name);
  //       setEmail(data.email);
  //       setRoleId(data.role);
  //       setUsername(data.username);
  //       setAvatarUrl(data.avatar);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }, [id, router]);

  const handleSubmit = () => {
    console.log("Submit Triggered");
  };

  const handleClickType = () => {
    setTypeInput(!typeInput);
  };

  return (
    <>
      <div>
        <h1 className="gcHeading7p text-gcPrimary-1000">Detail user</h1>
        <div className="grid-cols-8 grid gap-3">
          <div className="mt-3 border rounded-xl lg:p-4 md:p-3 p-2 col-span-3">
            <h1 className="gcContentAccent1p text-gcPrimary-1000 mb-3">Avatar</h1>
            {avatarUrl ? <img src={avatarUrl} alt="Avatar" className="max-h-20" /> : <h3>None</h3>}
          </div>
          <div className="mt-3 border rounded-xl lg:p-4 md:p-3 p-2 col-span-5">
            <h1 className="gcContentAccent1p text-gcPrimary-1000 mb-3">Contacts</h1>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <FaPhone className="text-gcPrimary-1000 sm:text-xl" />
                <h3 className="text-gcSecondary-600 sm:text-sm text-xs">{phone}</h3>
              </div>
              <div className="flex items-center gap-3">
                <MdEmail className="text-gcPrimary-1000 sm:text-xl" />
                <h3 className="text-gcSecondary-600 sm:text-sm text-xs">{email}</h3>
              </div>
            </div>
          </div>
          <div className="mt-3 border rounded-xl lg:p-4 md:p-3 p-2 col-span-8">
            <form method="POST">
              <h1 className="gcHeading7p text-gcPrimary-1000">General Information</h1>
              <div className="grid grid-cols-6 gap-3 mt-3">
                <div className="md:col-span-3 col-span-6">
                  <label htmlFor="name" className="text-gcPrimary-1000 gcContentAccent1p">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="e.g Name..."
                    required
                    value={name}
                    disabled
                    readOnly
                    className="block w-full rounded-xl border py-3 px-3 text-gcPrimary-1000 shadow-sm placeholder:text-gcSecondary-600 sm:text-sm text-xs sm:leading-6 bg-gcNeutrals-baseWhite focus:bg-white transition-all outline-none mt-1"
                  />
                </div>
                <div className="md:col-span-3 col-span-6">
                  <label htmlFor="username" className="text-gcPrimary-1000 gcContentAccent1p">
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="e.g Username..."
                    required
                    value={username}
                    disabled
                    readOnly
                    className="block w-full rounded-xl border py-3 px-3 text-gcPrimary-1000 shadow-sm placeholder:text-gcSecondary-600 sm:text-sm text-xs sm:leading-6 bg-gcNeutrals-baseWhite focus:bg-white transition-all outline-none mt-1"
                  />
                </div>
                <div className="md:col-span-3 col-span-6">
                  <label htmlFor="email" className="text-gcPrimary-1000 gcContentAccent1p">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="e.g Email..."
                    required
                    value={email}
                    disabled
                    readOnly
                    className="block w-full rounded-xl border py-3 px-3 text-gcPrimary-1000 shadow-sm placeholder:text-gcSecondary-600 sm:text-sm text-xs sm:leading-6 bg-gcNeutrals-baseWhite focus:bg-white transition-all outline-none mt-1"
                  />
                </div>
                <div className="md:col-span-3 col-span-6">
                  <label htmlFor="phone" className="text-gcPrimary-1000 gcContentAccent1p">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="number"
                    placeholder="e.g Phone number..."
                    required
                    value={phone}
                    disabled
                    readOnly
                    className="block w-full rounded-xl border py-3 px-3 text-gcPrimary-1000 shadow-sm placeholder:text-gcSecondary-600 sm:text-sm text-xs sm:leading-6 bg-gcNeutrals-baseWhite focus:bg-white transition-all outline-none mt-1"
                  />
                </div>
                <div className="md:col-span-3 col-span-6">
                  <div className="flex items-center justify-between">
                    <label htmlFor="roleId" className="text-gcPrimary-1000 gcContentAccent1p">
                      Role
                    </label>
                  </div>
                  <input
                    id="role"
                    name="role"
                    type="text"
                    required
                    value={roleId}
                    disabled
                    readOnly
                    className="block w-full rounded-xl border py-3 px-3 text-gcPrimary-1000 shadow-sm placeholder:text-gcSecondary-600 sm:text-sm text-xs sm:leading-6 bg-gcNeutrals-baseWhite focus:bg-white transition-all outline-none mt-1"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
