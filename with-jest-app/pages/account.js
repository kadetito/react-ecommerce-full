import Addresses from "@/components/Account/Addresses";
import EditEmailForm from "@/components/Account/EditEmailForm";
import EditNameForm from "@/components/Account/EditNameForm";
import EditPasswordForm from "@/components/Account/EditPasswordForm";
import useAuth from "hooks/useAuth";
import BasicLayout from "layouts/BasicLayout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getMeAPI } from "Services/UserService";

export default function Account() {
  const [user, setUser] = useState(undefined);
  const router = useRouter();
  const { auth, logout, setReloadUser } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getMeAPI(logout);
      setUser(response || null);
    })();
  }, [auth]);

  if (user === undefined) return null;
  if (!auth && !user) {
    router.replace("/");
    return null;
  }

  return (
    <BasicLayout className="account__global">
      <div className="card text-left m-5">
        <div className="card-body">
          <h4 className="card-title">
            Perfil de Usuario de {user.usuario.name} {user.usuario.lastname}
          </h4>
          <div className="row mt-5">
            <div className="col-12 col-md-6">
              <EditNameForm
                user={user}
                logout={logout}
                setReloadUser={setReloadUser}
              />
            </div>
            <div className="col-12 col-md-6">
              <EditEmailForm
                user={user}
                logout={logout}
                setReloadUser={setReloadUser}
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-12 col-md-6">
              <EditPasswordForm user={user} logout={logout} />
            </div>
            <div className="col-12 col-md-6"></div>
          </div>

          <div className="row mt-4">
            <div className="col-12">
              <Addresses user={user} logout={logout} />
            </div>
          </div>
        </div>
      </div>
    </BasicLayout>
  );
}
