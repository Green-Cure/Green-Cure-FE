"use client";

import request from "@/app/utils/request";
import { hostNoPrefix } from "@/app/utils/urlApi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPhone } from "react-icons/fa6";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { MdEmail } from "react-icons/md";

export default function DetailUser({ params }) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [roleId, setRoleId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    request
      .get("user")
      .then(function (response) {
        if (response.data?.statusCode === 200 || response.data?.statusCode === 201) {
          if (response.data.data.length > 0) {
            setUsers(response.data.data);
            const data = response.data.data.find((data) => data.id == params.id);
            if (!data) {
              router.push("/dashboard/users");
              return;
            }
            setName(data.name);
            setEmail(data.email);
            setRoleId(data.role);
            setUsername(data.username);
            if (data.avatar) {
              setAvatarUrl(`${hostNoPrefix}uploads/${data.avatar}`);
            }
            setPhone(data.phone);
          } else {
            setUsers([]);
          }
          toast.dismiss();
          setIsLoading(false);
        } else if (response.data.statusCode === 500) {
          console.error("INTERNAL_SERVER_ERROR");
          toast.dismiss();
          toast.error("Server Error");
          setIsLoading(false);
        } else {
          toast.dismiss();
          toast.error("An unexpected error occurred");
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.dismiss();
        toast.error("An unexpected error occurred");
        setIsLoading(false);
      });
  }, []);

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
                    value={roleId === "1" ? "Admin" : roleId === "2" ? "Guest" : "Member"}
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
