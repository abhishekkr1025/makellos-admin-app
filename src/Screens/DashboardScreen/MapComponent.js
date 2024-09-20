import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

// Fix for default Leaflet icon path issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Define icon paths as variables
const blueIconPath = 'https://cdn-icons-png.flaticon.com/128/8248/8248993.png'; // Add your blue icon URL here
const greenIconPath = 'https://cdn-icons-png.freepik.com/256/8839/8839155.png?semt=ais_hybrid';
const greyIconPath = 'https://www.freeiconspng.com/uploads/black-circle-icon-23.png';

// Define custom icons with specific sizes
const greenIcon = new L.Icon({
  iconUrl: greenIconPath,
  iconSize: [30, 30],
  iconAnchor: [12, 12],
});

const greyIcon = new L.Icon({
  iconUrl: greyIconPath,
  iconSize: [30, 30],
  iconAnchor: [12, 12],
});

const blueIcon = new L.Icon({
  iconUrl: blueIconPath,
  iconSize: [30, 30],
  iconAnchor: [12, 12],
});

const FitBounds = ({ bounds }) => {
  const map = useMap();

  useEffect(() => {
    if (bounds.length) {
      map.fitBounds(bounds);
    }
  }, [bounds, map]);

  return null;
};

const MapComponent = ({ onLocationClick }) => {
  const [customers, setCustomers] = useState([]);
  const [serviceProviders, setServiceProviders] = useState([]);
  const [bounds, setBounds] = useState([]);

  useEffect(() => {
    const fetchUsersAndAddresses = async () => {
      try {
        const usersResponse = await axios.get('http://34.131.81.53:8080/user/getAllUsers');
        const users = usersResponse.data;

        const customersWithAddresses = await Promise.all(users.map(async (user) => {
          const addressResponse = await axios.get(`http://dev.makellos.co.in:8080/address/getAllUserAddress/${user.userID}`);
          const address = addressResponse.data[0];

          if (address && address.latitude && address.longitude) {
            const customer = {
              id: user.userID,
              name: user.firstName,
              active: user.userActive,
              lat: parseFloat(address.latitude),
              lng: parseFloat(address.longitude),
              address: `${address.addressLine1}, ${address.addressLine2}, ${address.city}, ${address.state}, ${address.country} - ${address.pinCode}`,
              carbonEmissionLastMonth: null,
              carbonEmissionSinceInception: null,
            };

            if (customer.active) {
              // console.log('Active User:', customer);
            }



            return customer;
          }
          return null;
        }));

        const validCustomers = customersWithAddresses.filter(customer => customer !== null);
        setCustomers(validCustomers);

        const customerBounds = validCustomers.map(customer => [customer.lat, customer.lng]);
        setBounds(prevBounds => [...prevBounds, ...customerBounds]);

      } catch (error) {
        console.error('Error fetching users or addresses:', error);
      }
    };

    const fetchServiceProviders = async () => {
      try {
        const response = await axios.get('http://dev.makellos.co.in:8080/serviceProvider/getAllServiceProviders');
        const providers = response.data;

        const providersWithAddresses = await Promise.all(providers.map(async (provider) => {
          const addressResponse = await axios.get(`http://dev.makellos.co.in:8080/address/getAddressByIdAndUserType/service_provider/${provider.serviceProviderID}`);
          const address = addressResponse.data[0];

          if (address && address.latitude && address.longitude) {
            return {
              id: provider.serviceProviderID,
              name: provider.name,
              lat: parseFloat(address.latitude),
              lng: parseFloat(address.longitude),
              address: `${address.addressLine1}, ${address.addressLine2}, ${address.city}, ${address.state}, ${address.country} - ${address.pinCode}`,
            };
          }
          return null;
        }));

        const validProviders = providersWithAddresses.filter(provider => provider !== null);
        setServiceProviders(validProviders);

        const providerBounds = validProviders.map(provider => [provider.lat, provider.lng]);
        setBounds(prevBounds => [...prevBounds, ...providerBounds]);

      } catch (error) {
        console.error('Error fetching service providers or addresses:', error);
      }
    };

    fetchUsersAndAddresses();
    fetchServiceProviders();
  }, []);

  const handleMapClick = (locationData) => {
    // Assuming locationData contains customer info (userID, coordinates, etc.)
    onLocationClick(locationData);
  };

  const fetchCarbonEmissionData = async (userId) => {
    try {
      const lastMonthResponse = await axios.get(`http://dev.makellos.co.in:8080/dataReport/getUserSavedCarbonEmissionInLastMonthData/${userId}`);
      const inceptionResponse = await axios.get(`http://dev.makellos.co.in:8080/dataReport/getUserSavedCarbonEmissionDataSinceInception/${userId}`);

      return {
        lastMonth: lastMonthResponse.data,
        sinceInception: inceptionResponse.data,
      };
    } catch (error) {
      console.error(`Error fetching carbon emission data for user ${userId}:`, error);
      return null;
    }
  };

  const handleMarkerHover = async (userId, index) => {
    const carbonEmissionData = await fetchCarbonEmissionData(userId);
    setCustomers(prevCustomers => {
      const updatedCustomers = [...prevCustomers];
      updatedCustomers[index] = {
        ...updatedCustomers[index],
        carbonEmissionLastMonth: carbonEmissionData?.lastMonth,
        carbonEmissionSinceInception: carbonEmissionData?.sinceInception,
      };
      return updatedCustomers;
    });
  };

  return (
    <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: '500px', width: '100%', border:"2px solid black" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      <FitBounds bounds={bounds} />

      {serviceProviders.map((provider, index) => (
        provider.lat && provider.lng && (
          <Marker key={index} position={[provider.lat, provider.lng]} icon={blueIcon}>
            <Popup>{provider.name}<br />{provider.address}</Popup>
          </Marker>
        )
      ))}

      {customers.map((customer, index) => (
        customer.lat && customer.lng && (
          <Marker
            key={index}
            position={[customer.lat, customer.lng]}
            icon={customer.active ? greenIcon : greyIcon}
            eventHandlers={{
              mouseover: () => handleMarkerHover(customer.id, index),
              click: () => handleMapClick({ userID: customer.id }),
            }}
          >
            <Popup>
              {customer.name}<br />
              {customer.address}<br />
              {customer.carbonEmissionLastMonth !== null
                ? `Saved Carbon Emission (Last Month): ${customer.carbonEmissionLastMonth} kg`
                : 'Fetching last month carbon emission data...'}<br />
              {customer.carbonEmissionSinceInception !== null
                ? `Saved Carbon Emission (Since Inception): ${customer.carbonEmissionSinceInception} kg`
                : 'Fetching carbon emission since inception data...'}
            </Popup>
          </Marker>


        )
      ))}

    </MapContainer>
  );
};

export default MapComponent;
