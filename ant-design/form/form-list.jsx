const FormList = ({}) => {
  return <Form.List>{(fields) => fields.map((field) => <Form.Item {...field}></Form.Item>)}</Form.List>;
};

export default FormList;
