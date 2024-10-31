import { Link } from "react-router-dom";
import Container from "../components/PageContainer";
import { routes } from "../routes/routes";
import {
  Avatar,
  BreadcrumbProps,
  Card,
  Col,
  List,
  Progress,
  Rate,
  Row,
  Table,
  Tag,
} from "antd";
import { StatisticCard } from "@ant-design/pro-components";
import { AiOutlineTeam, AiOutlineStar } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { MdMenuBook } from "react-icons/md";
import StatCard from "../components/dashboard/startCard";
import { useState } from "react";
import LazyImage from "../components/LazyImage";
import useDashboard from "../hook/useDashboard";
import { IoFolderOpenOutline } from "react-icons/io5";
import { PiStudentDuotone } from "react-icons/pi";

const breadcrumb: BreadcrumbProps = {
  items: [
    {
      key: routes.dashboard,
      title: <Link to={routes.home}>Dashboard</Link>,
    },
  ],
};

const Dashboard = () => {
  const [reviews, setReviews] = useState([]);
  const loading = false;
  const { countCourse, countCategory, countStudent } = useDashboard();
  return (
    <Container transparent breadcrumb={breadcrumb}>
      <Row gutter={24}>
        <Col xl={6} lg={6} md={12} sm={24} xs={24}>
          <StatCard
            loading={loading}
            icon={<AiOutlineTeam />}
            title="Staff"
            number={12}
          />
        </Col>
        <Col xl={6} lg={6} md={12} sm={24} xs={24} style={{ marginBottom: 24 }}>
          <Link to={routes.course}>
            <StatCard
              loading={loading}
              icon={<MdMenuBook />}
              title="Courses"
              number={countCourse}
            />
          </Link>
        </Col>
        <Col xl={6} lg={6} md={12} sm={24} xs={24} style={{ marginBottom: 24 }}>
          <Link to={routes.category}>
            <StatCard
              loading={loading}
              icon={<IoFolderOpenOutline />}
              title="Subjects"
              number={countCategory}
            />
          </Link>
        </Col>
        <Col xl={6} lg={6} md={12} sm={24} xs={24} style={{ marginBottom: 24 }}>
          <Link to={routes.student}>
            <StatCard
              loading={loading}
              icon={<PiStudentDuotone />}
              title="Students"
              number={countStudent}
            />
          </Link>
        </Col>
        <Col xl={6} lg={6} md={12} sm={24} xs={24} style={{ marginBottom: 24 }}>
          <StatCard
            loading={loading}
            icon={<BiCommentDetail />}
            title="Comments"
            number={500}
          />
        </Col>
        <Col xl={6} lg={6} md={12} sm={24} xs={24} style={{ marginBottom: 24 }}>
          <StatCard
            loading={loading}
            icon={<AiOutlineStar />}
            title="Reviews"
            number={100}
          />
        </Col>
        <Col
          xl={12}
          lg={12}
          md={24}
          sm={24}
          xs={24}
          style={{ marginBottom: 24 }}
        >
          <Card bordered={false} className="w-full h-full cursor-default">
            <StatisticCard.Group direction="row">
              <StatisticCard
                statistic={{
                  title: "XYZ",
                  value: loading ? 0 : 123,
                }}
              />
              <StatisticCard
                statistic={{
                  title: "Progress",
                  value: "ABC",
                }}
                chart={
                  <Progress
                    className="text-primary"
                    percent={loading ? 0 : 75}
                    type="circle"
                    size={"small"}
                    strokeColor={"#1890ff"}
                  />
                }
                chartPlacement="left"
              />
            </StatisticCard.Group>
          </Card>
        </Col>
        <Col
          xl={12}
          lg={12}
          md={12}
          sm={24}
          xs={24}
          style={{ marginBottom: 24 }}
        >
          <Card bordered={false} className="w-full h-full cursor-default">
            <List
              loading={loading}
              itemLayout="horizontal"
              dataSource={[]}
              renderItem={(user) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        shape="circle"
                        size="small"
                        src={
                          <LazyImage
                            src={""}
                            placeholder={
                              <div className="bg-gray-100 h-full w-full" />
                            }
                          />
                        }
                      />
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col
          xl={12}
          lg={12}
          md={12}
          sm={24}
          xs={24}
          style={{ marginBottom: 24 }}
        >
          <Card bordered={false} className="w-full h-full cursor-default">
            <Table
              loading={loading}
              pagination={false}
              showHeader={false}
              dataSource={reviews}
              columns={[
                {
                  title: "Title",
                  dataIndex: "title",
                  key: "title",
                  align: "left",
                },
                {
                  title: "Year",
                  dataIndex: "year",
                  key: "year",
                  align: "center",
                  render: (_, row) => <Tag color={row}>{row}</Tag>,
                },
                {
                  title: "Star",
                  dataIndex: "star",
                  key: "star",
                  align: "center",
                  render: (_, row) => <Rate disabled defaultValue={row} />,
                },
              ]}
            />
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
