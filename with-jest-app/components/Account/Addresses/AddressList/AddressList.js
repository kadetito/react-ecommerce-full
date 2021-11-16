import useAuth from "hooks/useAuth";
import React, { useEffect, useState } from "react";
import { getAddressesAPI } from "Services/AddressService";
import { map, size } from "lodash";
import BotonPositivo from "@/components/Form/ButtonCustom/BotonPositivo";
import BotonNegativo from "@/components/Form/ButtonCustom/BotonNegativo";
import LoaderSpinner from "@/components/LoaderSpinner";

export default function AddressList(props) {
  const { reloadAddresses, setReloadAddresses } = props;
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
                  <Address address={address} loading={loading} />
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
  const { address, loading } = props;

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
              loading={loading}
            />
          </div>
          <div>
            <BotonPositivo
              type="button"
              textButton="Modificar"
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
