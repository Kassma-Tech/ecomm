
import { Button, Dropdown, Form, Input, Select, message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons'
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react';
import { useAddProductMutation } from '../endpoints/productApiSlice';


function AddProduct() {

    const [isLoading, setIsLoading] = useState(false);
    const [product, setProduct] = useState({
        product_name: '',
        product_image: '',
        product_description: '',
        product_price: '',
        noOfProduct: '',
    })

    const [addProduct] = useAddProductMutation()

    const submitHandler = async () => {
        try {
            const result = await addProduct(product).unwrap()

            console.log(result)
        } catch (error) {
            console.log(error)
        }

    }

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: true,
                }}
                autoComplete="off"
                onFinish={submitHandler}
            >
                <Form.Item
                    label="Product name"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter your product name',
                        },
                    ]}
                >
                    <Input onChange={handleChange} type="name" name="product_name" />
                </Form.Item>
                <Form.Item
                    label="Product image"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your product image!',
                        },
                    ]}
                >
                    <Input onChange={handleChange} type="text" name="product_image" />
                </Form.Item>

                <Form.Item
                    label="Product price"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your product price!',
                        },
                    ]}
                >
                    <Input onChange={handleChange} type="Number" name="product_price" />
                </Form.Item>

                <Form.Item
                    label="Number of product"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your number of product!',
                        },
                    ]}
                >
                    <Input onChange={handleChange} type="Number" name="noOfProduct" />
                </Form.Item>

                <Form.Item
                    label="Product description"
                >
                    <TextArea name="product_description" onChange={handleChange} />
                </Form.Item>

                <Form.Item

                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit" style={{ width: 400 }} disabled={isLoading ? true : false}>
                        {isLoading ? <LoadingOutlined size={10} /> : "Add product"}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default AddProduct