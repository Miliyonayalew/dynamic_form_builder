import { useNavigate } from "react-router-dom";
import { Button, Input, Form, Typography } from "antd";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormItem } from "react-hook-form-antd";
import * as yup from 'yup';

const schema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
});

type FormValues = {
  title: string;
  description: string;
};

const { TextArea } = Input
const { Title } = Typography;

const FormCreation = () => {
  const navigate = useNavigate();

  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      title: "",
      description: "",
    },
    resolver: yupResolver(schema)
  });


  const onSubmit = (data: FormValues) => {
    navigate("/form-builder", { state: data });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <Title level={2} style={{ marginBottom: '2rem' }}>Dynamic Form Builder</Title>
      <Form
        layout="horizontal"
        name="basic"
        onFinish={handleSubmit(onSubmit)}
        noValidate
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        style={{width: '30%'}}      
      >
        <FormItem control={control} name="title" label="Title">
          <Input />
        </FormItem>
        <FormItem  control={control} name="description" label="Description">
          <TextArea rows={4}/>
        </FormItem>
        <Button type="primary" htmlType="submit">
          Next
        </Button>
      </Form>
    </div>
  )
}

export default FormCreation;