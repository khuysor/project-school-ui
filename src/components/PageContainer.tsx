import {
  ProCard,
  PageContainer,
  useBreakpoint,
} from "@ant-design/pro-components";
import { BasePageContainerProps } from "../util/helper";

const Container = (props: BasePageContainerProps) => {
  const isMobile = useBreakpoint();
  return (
    <PageContainer
      childrenContentStyle={isMobile ? { paddingInline: 15 } : {}}
      header={{
        title: props.title,
        breadcrumb: props.breadcrumb ? props.breadcrumb : undefined,
        extra: props.extra,
      }}
    >
      <ProCard
        className={`mb-10 ${!props.transparent ? "shadow-lg" : ""} `}
        size="small"
        style={{ minHeight: 500 }}
        ghost={props.transparent}
      >
        {props.children}
      </ProCard>
    </PageContainer>
  );
};

export default Container;
