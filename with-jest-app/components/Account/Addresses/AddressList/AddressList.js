import useAuth from "hooks/useAuth";
import React, { useEffect, useState } from "react";
import { getAddressesAPI, deleteAddressesAPI } from "Services/AddressService";
import { map, size } from "lodash";
import BotonPositivo from "@/components/Form/ButtonCustom/BotonPositivo";
import BotonNegativo from "@/components/Form/ButtonCustom/BotonNegativo";
import LoaderSpinner from "@/components/LoaderSpinner";
import Swal from "sweetalert2";

export default function AddressList(props) {
  const { reloadAddresses, setReloadAddresses, openModal } = props;
  const [addresses, setAddresses] = useState(null);
  const { auth, logout } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await getAddressesAPI(auth.idUser, logout);
      setAddresses(response || []);
      setReloadAddresses(false);
    })();
  }, [reloadAddresses]);

  if (!addresses) return <LoaderSpinner />;
  return (
    addresses && (
      <div className="account__lista-addresses">
        <div className="row">
          {size(addresses) === 0 ? (
            <div>No hay direcciones aún</div>
          ) : (
            <>
              {map(addresses.direcciones, (address) => (
                <div key={address._id} className="col-12 col-sm-6 col-xl-4">
                  <Address
                    address={address}
                    loading={loading}
                    logout={logout}
                    setReloadAddresses={setReloadAddresses}
                    openModal={openModal}
                  />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    )
  );
}

function Address(props) {
  const [loadingDelete, setLoadingDelete] = useState(false);
  const { address, logout, setReloadAddresses, openModal } = props;
  const deleteAddress = () => {
    setLoadingDelete(true);
    Swal.fire({
      title: `Desea borrar ${address.title}?`,
      text: "No podrá recuperarla, deberá crearla de nuevo",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, borrarla",
      cancelButtonText: "No, cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const response = deleteAddressesAPI(address._id, logout);
        if (response) setReloadAddresses(true);
        Swal.fire("Borrada!", "La dirección ha sido eliminada", "success");
      }
    });
    setLoadingDelete(false);
  };
  return (
    <div className="card text-left">
      <div className="card-body">
        <h6 className="card-title truncate-text">{address.title}</h6>
        <p className="card-text">{address.name}</p>
        <p className="card-text">
          {address.address} ({address.postalcode})
        </p>
        <p className="card-text">
          {address.city} - {address.state}
        </p>
        <p className="card-text"> {address.phone}</p>
      </div>
      <div className="row">
        <div className="col-12 ps-4 pe-4 pb-3 d-flex justify-content-between">
          <div>
            <BotonNegativo
              type="button"
              textButton="Borrar"
              loading={loadingDelete}
              onClick={deleteAddress}
            />
          </div>
          <div>
            <BotonPositivo
              onClick={() => openModal(`Editar ${address.title}`, address)}
              type="button"
              textButton="Modificar"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
