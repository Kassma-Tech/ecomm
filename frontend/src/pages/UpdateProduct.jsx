import { Button, Form, Input, message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons'
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react';
import { useGetSingleProductQuery, useUpdateProductMutation } from '../endpoints/productApiSlice';
import { useLocation } from 'react-router-dom';


function UpdateProduct() {

    const location = useLocation();
    console.log(location.state)
    const [isLoading, setIsLoading] = useState(false);
    const { data: currentProduct, isLoading: isPageLoading } = useGetSingleProductQuery(location.state.id);


    const [product, setProduct] = useState({
        product_name: "",
        product_image: "",
        product_description: "",
        product_price: "",
        noOfProduct: "",
    })

    const [updateProduct] = useUpdateProductMutation()

    const onFinish = async (value) => {
        console.log(value)
        try {
            await updateProduct({ product_id: location.state.id, value: product }).unwrap()
            message.success('Product updates successfully')
        } catch (error) {
            message.error('Product not updated')
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
        isPageLoading ? <h1>Loading ...</h1>
            : <div>
                <Form
                    name="basic"
                    style={{
                        maxWidth: 350,
                        margin: '50px auto 0 auto'
                    }}
                    layout='vertical'
                    initialValues={{
                        remember: true,
                    }}
                    autoComplete="off"
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Product name">
                        <Input onChange={handleChange} type="name" name="product_name" defaultValue={currentProduct?.product_name} />
                    </Form.Item>
                    <Form.Item
                        label="Product image"
                    >
                        <Input onChange={handleChange} type="text" name="product_image" defaultValue={currentProduct?.product_image} />
                    </Form.Item>

                    <Form.Item
                        label="Product description">
                        <TextArea name="product_description" onChange={handleChange} defaultValue={currentProduct?.product_description} />
                    </Form.Item>

                    <Form.Item
                        label="Product price">
                        <Input onChange={handleChange} type="Number" name="product_price" defaultValue={currentProduct?.product_price} />
                    </Form.Item>

                    <Form.Item
                        label="Number of product"
                    >
                        <Input onChange={handleChange} type="Number" name="itemsInStock" defaultValue={currentProduct?.noOfProduct} />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: 350 }} disabled={isLoading ? true : false}>
                            {isLoading ? <LoadingOutlined size={10} /> : "Add product"}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
    )
}

export default UpdateProduct