"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function AddUser() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState();
  const [password, setPassword] = useState("");
  const [roleId, setRoleId] = useState("");
  const [typeInput, setTypeInput] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.error("This feature is under devlopement");
  };

  const handleClickType = () => {
    setTypeInput(!typeInput);
  };

  const roleDatas = [
    {
      id: "1",
      name: "Admin",
    },
    {
      id: "2",
      name: "Guest",
    },
    {
      id: "3",
      name: "Member",
    },
  ];

  return (
    <>
      <div>
        <h1 className="gcHeading7p text-gcPrimary-1000">Create user</h1>
        <div className="mt-3 border rounded-xl lg:p-4 md:p-3 p-2">
          <form method="POST" onSubmit={handleSubmit}>
            <div className="grid grid-cols-6 gap-3">
              <div className="col-span-3">
                <label htmlFor="name" className="text-gcPrimary-1000 gcContentAccent1p">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="e.g Name..."
                  required
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  className="block w-full rounded-xl border py-3 px-3 text-gcPrimary-1000 shadow-sm placeholder:text-gcSecondary-600 sm:text-sm sm:leading-6 bg-gcNeutrals-baseWhite focus:bg-white transition-all outline-none mt-1"
                />
              </div>
              <div className="col-span-3">
                <label htmlFor="username" className="text-gcPrimary-1000 gcContentAccent1p">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="e.g Username..."
                  required
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  className="block w-full rounded-xl border py-3 px-3 text-gcPrimary-1000 shadow-sm placeholder:text-gcSecondary-600 sm:text-sm sm:leading-6 bg-gcNeutrals-baseWhite focus:bg-white transition-all outline-none mt-1"
                />
              </div>
              <div className="col-span-3">
                <label htmlFor="email" className="text-gcPrimary-1000 gcContentAccent1p">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="e.g Email..."
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="block w-full rounded-xl border py-3 px-3 text-gcPrimary-1000 shadow-sm placeholder:text-gcSecondary-600 sm:text-sm sm:leading-6 bg-gcNeutrals-baseWhite focus:bg-white transition-all outline-none mt-1"
                />
              </div>
              <div className="col-span-3">
                <label htmlFor="phone" className="text-gcPrimary-1000 gcContentAccent1p">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="number"
                  placeholder="e.g Phone number..."
                  required
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                  className="block w-full rounded-xl border py-3 px-3 text-gcPrimary-1000 shadow-sm placeholder:text-gcSecondary-600 sm:text-sm sm:leading-6 bg-gcNeutrals-baseWhite focus:bg-white transition-all outline-none mt-1"
                />
              </div>
              <div className="col-span-3">
                <div className="flex items-center justify-between">
                  <label htmlFor="roleId" className="text-gcPrimary-1000 gcContentAccent1p">
                    Role
                  </label>
                </div>
                <select
                  id={"roleId"}
                  name={"roleId"}
                  type={"text"}
                  value={roleId}
                  required
                  label={"Role"}
                  onChange={(e) => {
                    setRoleId(e.target.value);
                  }}
                  className="
                  
                  block w-full rounded-xl border py-3.5 px-3 text-gcPrimary-1000 shadow-sm placeholder:text-gcSecondary-600 sm:text-sm bg-gcNeutrals-baseWhite focus:bg-white transition-all outline-none mt-1"
                >
                  <option value="" disabled>
                    Select One
                  </option>
                  {roleDatas &&
                    roleDatas.map((data, index) => (
                      <option key={index} value={data.id}>
                        {data.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="col-span-3">
                <div className="flex items-center justify-between">
                  <label htmlFor="avatar" className="text-gcPrimary-1000 gcContentAccent1p">
                    Avatar
                  </label>
                </div>
                <input
                  id="avatar"
                  name="avatar"
                  accept={"image/*"}
                  type={"file"}
                  onChange={(e) => setAvatar(e.target.files)}
                  className="block w-full rounded-xl border py-2.5 px-3 text-gcPrimary-1000 shadow-sm placeholder:text-gcSecondary-600 sm:text-sm sm:leading-6 bg-gcNeutrals-baseWhite focus:bg-white transition-all outline-none mt-1"
                />
              </div>
              <div className="col-span-3 relative">
                <label htmlFor="password" className="text-gcPrimary-1000 gcContentAccent1p">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={typeInput ? "password" : "text"}
                    placeholder="e.g Password..."
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className="block w-full rounded-xl border py-3 px-3 text-gcPrimary-1000 shadow-sm placeholder:text-gcSecondary-600 sm:text-sm sm:leading-6 bg-gcNeutrals-baseWhite focus:bg-white transition-all outline-none mt-1"
                  />
                  {typeInput ? <FiEye className="text-xl absolute top-1/2 -translate-y-1/2 right-3" onClick={handleClickType} /> : <FiEyeOff className="text-xl absolute top-1/2 -translate-y-1/2 right-3" onClick={handleClickType} />}
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="mt-3 text-gcNeutrals-baseWhite bg-gcPrimary-600 transition hover:bg-gcPrimary-700 focus:ring-2 focus:outline-none focus:ring-gcPrimary-300 font-medium rounded-lg text-sm px-4 py-2 md:px-6 md:py-2 text-center"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
