"use client";

import { FC } from "react";
import { Card, Row, Col, Form, Input, InputNumber, Button, Space, Tag, Typography, Grid } from "antd";

import dynamic from "next/dynamic";

const { Text } = Typography;
const { useBreakpoint } = Grid;
const LocationMap = dynamic(() => import("@/components/pwa/LocationMap"), { ssr: false });

interface LocationSettingsTabProps {
  perimeterSettings: any;
  onUpdatePerimeter: () => void;
  form: any; // AntD FormInstance
}

const LocationSettingsTab: FC<LocationSettingsTabProps> = ({ perimeterSettings, onUpdatePerimeter, form }) => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  return (
    <Card 
      title="GPS Perimeter Management" 
      size={isMobile ? "small" : "default"}
      styles={{ body: { padding: isMobile ? "12px" : "24px" } }}
    >
      {perimeterSettings ? (
        <Form form={form} layout="vertical" initialValues={perimeterSettings} onFinish={onUpdatePerimeter}>
          <Row gutter={[isMobile ? 12 : 24, isMobile ? 12 : 24]}>
            <Col xs={24} md={12}>
              <div style={{ height: isMobile ? "250px" : "400px", width: "100%", borderRadius: "8px", overflow: "hidden", marginBottom: isMobile ? "12px" : "0" }}>
                <LocationMap
                  centerLat={perimeterSettings.centerLatitude}
                  centerLng={perimeterSettings.centerLongitude}
                  radius={perimeterSettings.radiusKm}
                  editable
                  onChange={(newCenter, newRadius, newAddress) => {
                    form.setFieldsValue({
                      centerLat: newCenter.lat,
                      centerLng: newCenter.lng,
                      centerAddress: newAddress,
                      radius: newRadius,
                    });
                  }}
                />
              </div>
            </Col>

            {/* hidden inputs */}
            <Form.Item name="centerLat" hidden><Input type="hidden" /></Form.Item>
            <Form.Item name="centerLng" hidden><Input type="hidden" /></Form.Item>
            <Form.Item name="radius" hidden><Input type="hidden" /></Form.Item>
            <Form.Item name="centerAddress" hidden><Input type="hidden" /></Form.Item>

            <Col xs={24} md={12}>
              <Card size="small" title="Current Settings">
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Text>
                    <strong>Status:</strong>{" "}
                    <Tag color={perimeterSettings.isActive ? "green" : "red"}>
                      {perimeterSettings.isActive ? "Active" : "Disabled"}
                    </Tag>
                  </Text>
                  <Text><strong>Updated By:</strong> {perimeterSettings.updatedBy.name}</Text>
                  <Text><strong>Radius:</strong> {perimeterSettings.radiusKm} km</Text>
                  <Text><strong>Center:</strong> {perimeterSettings.address}</Text>
                  <Text type="secondary" style={{ fontSize: isMobile ? '12px' : '14px' }}>Workers can only clock in/out within this perimeter</Text>
                </Space>
              </Card>
            </Col>
          </Row>
          <Form.Item style={{ marginTop: 24 }}><Button type="primary" htmlType="submit" block={isMobile}>Update Location</Button></Form.Item>
        </Form>
      ) : (
        <Form
          form={form}
          layout="vertical"
          initialValues={{ centerLat: 19.076, centerLng: 72.8777, radius: 0.7 }}
          onFinish={onUpdatePerimeter}
        >
          <Row gutter={[isMobile ? 12 : 24, isMobile ? 12 : 24]}>
            <Col xs={24} md={12}>
              <div style={{ height: isMobile ? "250px" : "400px", width: "100%", borderRadius: "8px", overflow: "hidden", marginBottom: isMobile ? "12px" : "0" }}>
                <LocationMap centerLat={19.076} centerLng={72.8777} radius={0.7} editable onChange={(newCenter, newRadius, newAddress) => {
                  form.setFieldsValue({
                    centerLat: newCenter.lat,
                    centerLng: newCenter.lng,
                    centerAddress: newAddress,
                    radius: newRadius,
                  });
                }} />
              </div>
            </Col>
            <Col xs={24} md={12}>
              <Card size="small" title="New Perimeter">
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Text type="secondary">Drag the marker to set location</Text>
                  <Form.Item name="radius" label="Radius (km)"><InputNumber min={0.1} max={20} step={0.1} style={{ width: '100%' }} /></Form.Item>
                  <Form.Item name="centerAddress" label="Center Address"><Input readOnly /></Form.Item>
                  <Form.Item name="centerLat" hidden><Input type="hidden" /></Form.Item>
                  <Form.Item name="centerLng" hidden><Input type="hidden" /></Form.Item>
                </Space>
              </Card>
            </Col>
          </Row>
          <Form.Item style={{ marginTop: 24 }}><Button type="primary" htmlType="submit" block={isMobile}>Save Location</Button></Form.Item>
        </Form>
      )}
    </Card>
  );
};

export default LocationSettingsTab;
