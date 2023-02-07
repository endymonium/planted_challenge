import React, { useState, useEffect } from 'react';
import { Select, List, Typography } from 'antd';

const { Option } = Select;
const { Text } = Typography;

// ChartGPT
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return Math.round(distance);
}

const Locations = ({ customerLocations, plantationsProjects }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [filteredLocations] = useState(customerLocations);
  const [closestPlantations, setClosestPlantations] = useState([]);

  useEffect(() => {
    if (!selectedLocation) return;

    // ChatGPT did not correctly map back from the selectedLocation value to the object
    const selectedLocationObj = customerLocations.filter((el) => el.name === selectedLocation);
    if (!selectedLocationObj.length === 1) return;
    const selectedLatitude = selectedLocationObj[0].latitude;
    const selectedLongitude = selectedLocationObj[0].longitude;

    const closestPlantations = plantationsProjects
      .map((plantation) => {
        const plantationLatitude = plantation.latitude;
        const plantationLongitude = plantation.longitude;
        // This was the original ChartGPT function, which did not work for me
        // const distance = Math.sqrt((selectedLatitude - plantationLatitude) ** 2 + (selectedLongitude - plantationLongitude) ** 2) * 100;
        const distance = getDistance(selectedLatitude, selectedLongitude, plantationLatitude, plantationLongitude);
        return { ...plantation, distance };
      })
      // ChartGPT snippet
      .filter((obj, index, self) => {
        return index === self.findIndex((t) => t.distance === obj.distance);
      })
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 3);

    setClosestPlantations(closestPlantations);
  }, [selectedLocation, plantationsProjects, customerLocations]);

  return (
    <>
      <Select showSearch placeholder="Select a location" onChange={(value) => setSelectedLocation(value)} style={{ width: '200px', marginBottom: '20px' }}>
        {filteredLocations.map((location) => (
          <Option key={location.name} value={location.name}>
            {location.name}
          </Option>
        ))}
      </Select>
      {selectedLocation && (
        <List
          header={<h3>Closest Plantations</h3>}
          dataSource={closestPlantations}
          renderItem={(plantation) => (
            <List.Item>
              <Text strong>ID:</Text> {plantation.id}
              <br />
              <Text strong>Project Name:</Text> {plantation.projectName}
              <br />
              <Text strong>Distance:</Text> {plantation.distance} km
            </List.Item>
          )}
        />
      )}
    </>
  );
};

export default Locations;
