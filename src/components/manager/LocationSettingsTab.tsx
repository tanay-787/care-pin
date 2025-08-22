"use client";

import { FC } from "react";
import { Card, Row, Col, Form, Input, InputNumber, Button, Space, Tag, Typography } from "antd";

import dynamic from "next/dynamic";

const { Text } = Typography;
const LocationMap = dynamic(() => import("@/components/pwa/LocationMap"), { ssr: false });

interface LocationSettingsTabProps {
  perimeterSettings: any;
  onUpdatePerimeter: () => void;
  form: any; // AntD FormInstance
}

const LocationSettingsTab: FC<LocationSettingsTabProps> = ({ perimeterSettings, onUpdatePerimeter, form }) => {
  return (
    <Card title="GPS Perimeter Management">
      {perimeterSettings ? (
        <Form form={form} layout="vertical" initialValues={perimeterSettings} onFinish={onUpdatePerimeter}>
          <Row gutter={24}>
            <Col xs={24} md={12}>
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
                  <Text type="secondary">Workers can only clock in/out within this perimeter</Text>
                </Space>
              </Card>
            </Col>
          </Row>
          <Form.Item><Button type="primary" htmlType="submit">Update Location</Button></Form.Item>
        </Form>
      ) : (
        <Form
          form={form}
          layout="vertical"
          initialValues={{ centerLat: 19.076, centerLng: 72.8777, radius: 2 }}
          onFinish={onUpdatePerimeter}
        >
          <Row gutter={24}>
            <Col xs={24} md={12}>
              <LocationMap centerLat={19.076} centerLng={72.8777} radius={2} editable onChange={(newCenter, newRadius, newAddress) => {
                form.setFieldsValue({
                  centerLat: newCenter.lat,
                  centerLng: newCenter.lng,
                  centerAddress: newAddress,
                  radius: newRadius,
                });
              }} />
            </Col>
            <Col xs={24} md={12}>
              <Card size="small" title="New Perimeter">
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Text type="secondary">Drag the marker to set location</Text>
                  <Form.Item name="radius" label="Radius (km)"><InputNumber min={0.5} max={20} step={0.5} /></Form.Item>
                  <Form.Item name="centerAddress" label="Center Address"><Input readOnly /></Form.Item>
                  <Form.Item name="centerLat" hidden><Input type="hidden" /></Form.Item>
                  <Form.Item name="centerLng" hidden><Input type="hidden" /></Form.Item>
                </Space>
              </Card>
            </Col>
          </Row>
          <Form.Item><Button type="primary" htmlType="submit">Save Location</Button></Form.Item>
        </Form>
      )}
    </Card>
  );
};

export default LocationSettingsTab;
