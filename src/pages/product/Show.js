import React, { useEffect, useState, useCallback } from 'react'
import { ChevronLeft } from 'react-feather'
import { Link } from 'react-router-dom'
import { DangerButton, GrayButton } from '../../components/button/Index'
import { Layout, Main } from '../../components/layout/Index'
import { Loader } from '../../components/loader/Index'
import Gallery from 'react-photo-gallery'
import Carousel, { Modal, ModalGateway } from "react-images";


const Show = () => {
    const [loading, setLoading] = useState(true)
    const [currentImage, setCurrentImage] = useState(0)
    const [viewerIsOpen, setViewerIsOpen] = useState(false)
    const [cancelVendor, setCancelVendor] = useState(false)

    const openLightbox = useCallback((event, { photo, index }) => {
        setCurrentImage(index)
        setViewerIsOpen(true)
    }, [])

    const closeLightbox = () => {
        setCurrentImage(0)
        setViewerIsOpen(false)
    }

    const photos = [
        {
            src: "https://api.eazybest.com/upload/products/additional/product-1625758836343.png",
            width: 1,
            height: 1
        },
        {
            src: "https://api.eazybest.com/upload/products/additional/product-1625758837259.png",
            width: 1,
            height: 1
        },
        {
            src: "https://api.eazybest.com/upload/products/additional/product-1625761433494.png",
            width: 1,
            height: 1
        },
        {
            src: "https://api.eazybest.com/upload/products/additional/product-1625761434208.png",
            width: 1,
            height: 1
        }
    ]

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [])

    // Handle vendor request
    const handleVendorRequest = async () => {
        setCancelVendor(true)

        setTimeout(() => {
            setCancelVendor(false)
        }, 1000)
    }

    if (loading) return <Loader />

    return (
        <div>
            <Layout
                page="dashboard / product show"
                message="Product details."
                container="container-fluid"
                button={
                    <div>
                        <Link to="/dashboard/product">
                            <GrayButton type="button">
                                <ChevronLeft size={15} style={{ marginRight: 5 }} />
                                <span style={{ fontSize: 13 }}>BACK</span>
                            </GrayButton>
                        </Link>
                    </div>
                }
            />

            <Main>

                {/* Product images */}
                <div className="col-12">
                    <Gallery photos={photos} onClick={openLightbox} />

                    <ModalGateway>
                        {viewerIsOpen ? (
                            <Modal onClose={closeLightbox}>
                                <Carousel
                                    currentIndex={currentImage}
                                    views={photos.map(x => ({
                                        ...x,
                                        srcset: x.srcSet,
                                        caption: x.title
                                    }))}
                                />
                            </Modal>
                        ) : null}
                    </ModalGateway>
                </div>

                {/* Basic information */}
                <div className="col-12 mt-3">
                    <h5><b>Xiaomi mobile phone</b></h5>
                    <div className="d-flex">
                        <div className="pt-2">
                            <h6>Vendor request ( <span className="text-success">Approved</span> )</h6>
                        </div>
                        <div className="ml-auto">
                            <DangerButton
                                type="button"
                                className="px-4"
                                disabled={cancelVendor}
                                onClick={handleVendorRequest}
                            >{cancelVendor ? "Canceling ..." : "Cancel"}</DangerButton>
                        </div>
                    </div>
                </div>

                <div className="col-12"><hr /></div>

                {/* Product Full information */}
                <div className="col-12 col-lg-6 mb-3">
                    <table className="table table-sm table-borderless">
                        <tbody>
                            <tr>
                                <td style={{ width: 100 }}><p className="text-dark mb-0">Status</p></td>
                                <td><p className="mb-0">: <span className="text-success">Active</span></p></td>
                            </tr>
                            <tr>
                                <td style={{ width: 100 }}><p className="text-dark mb-0">Brand</p></td>
                                <td><p className="text-capitalize mb-0">: Famefair</p></td>
                            </tr>
                            <tr>
                                <td style={{ width: 100 }}><p className="text-dark mb-0">Category</p></td>
                                <td><p className="text-capitalize mb-0">: electromics</p></td>
                            </tr>
                            <tr>
                                <td style={{ width: 100 }}><p className="text-dark mb-0">SKU</p></td>
                                <td><p className="mb-0">: FF2021</p></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="col-12 col-lg-6 mb-3">
                    <table className="table table-sm table-borderless">
                        <tbody>
                            <tr>
                                <td style={{ width: 100 }}><p className="text-dark mb-0">Stock Amount</p></td>
                                <td><p className="mb-0">: 20</p></td>
                            </tr>
                            <tr>
                                <td style={{ width: 100 }}><p className="text-dark mb-0">Purchase Price</p></td>
                                <td><p className="mb-0">: Tk. 5000</p></td>
                            </tr>
                            <tr>
                                <td style={{ width: 100 }}><p className="text-dark mb-0">Sale Price</p></td>
                                <td><p className="mb-0">: Tk. 7000</p></td>
                            </tr>
                            <tr>
                                <td style={{ width: 100 }}><p className="text-dark mb-0">Tags</p></td>
                                <td><p className="mb-0">: Mobile, Xiaomi, Mobile-phone, Android</p></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Vendor information */}
                <div className="col-12 col-lg-6 mb-3">
                    <h6>Vendor information</h6>

                    <table className="table table-sm table-borderless">
                        <tbody>
                            <tr>
                                <td style={{ width: 100 }}><p className="text-dark mb-0">Name</p></td>
                                <td><p className="text-capitalize mb-0">: <Link to={`/dashboard/vendor/show/1`}>Famefair</Link></p></td>
                            </tr>
                            <tr>
                                <td style={{ width: 100 }}><p className="text-dark mb-0">E-mail</p></td>
                                <td><p className="mb-0">: famefair@gmail.com</p></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="col-12 col-lg-6 mb-3">
                    <table className="table table-sm table-borderless">
                        <tbody>
                            <tr>
                                <td style={{ width: 100 }}><p className="text-dark mb-0">Phone</p></td>
                                <td><p className="mb-0">: 01XXXXXXXXX</p></td>
                            </tr>
                            <tr>
                                <td style={{ width: 100 }}><p className="text-dark mb-0">Address</p></td>
                                <td><p className="text-capitalize mb-0">: Ashulia, savar, dhaka</p></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Additional information */}
                <div className="col-12 col-lg-6 mb-3">
                    <h6 className="mb-3">Additional information</h6>

                    <table className="table table-sm">
                        <tbody>
                            <tr>
                                <td style={{ minWidth: 100 }}><p className="text-dark mb-0">Screen</p></td>
                                <td><p className="text-capitalize mb-0">6x6 Inch.</p></td>
                            </tr>
                            <tr>
                                <td style={{ minWidth: 100 }}><p className="text-dark mb-0">Body</p></td>
                                <td><p className="text-capitalize mb-0">Metal</p></td>
                            </tr>
                            <tr>
                                <td style={{ minWidth: 100 }}><p className="text-dark mb-0">Weight</p></td>
                                <td><p className="text-capitalize mb-0">250gm</p></td>
                            </tr>
                            <tr>
                                <td style={{ minWidth: 100 }}><p className="text-dark mb-0">Battery</p></td>
                                <td><p className="text-capitalize mb-0">4000mah</p></td>
                            </tr>
                            <tr>
                                <td style={{ minWidth: 100 }}><p className="text-dark mb-0">Camera</p></td>
                                <td><p className="text-capitalize mb-0">60 pixel</p></td>
                            </tr>
                            <tr>
                                <td style={{ minWidth: 100 }}><p className="text-dark mb-0">Bluetooth</p></td>
                                <td><p className="text-capitalize mb-0">Yes</p></td>
                            </tr>
                            <tr>
                                <td style={{ minWidth: 100 }}><p className="text-dark mb-0">Processor</p></td>
                                <td><p className="text-capitalize mb-0">Octa</p></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Youtube embed video */}
                <div className="col-12 col-lg-6 mb-3">
                    <h6 className="mb-3">Youtube embed video</h6>

                    <div style={{ width: 'auto', height: 'auto' }}>
                        <div className="embed-responsive embed-responsive-21by9">
                            <iframe className="embed-responsive-item" title={'Xiaomi Mi 11 ultra'} src={'https://www.youtube.com/embed/rg4enw17jgQ'} allowFullScreen></iframe>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="col-12 mb-4">
                    <h6 className="mb-3">Description</h6>

                    <p className="mb-0">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                        molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                        numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                        optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                        obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                        nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
                        tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
                        quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos
                        sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam
                        recusandae alias error harum maxime adipisci amet laborum. Perspiciatis
                        minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit
                        quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur
                        fugiat, temporibus enim commodi iusto libero magni deleniti quod quam
                        consequuntur! Commodi minima excepturi repudiandae velit hic maxime
                        doloremque. Quaerat provident commodi consectetur veniam similique ad
                        earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo
                        fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore
                        suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium
                        modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam
                        totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam
                        quasi aliquam eligendi, placeat qui corporis!

                        <br />
                        <br />

                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                        molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                        numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                        optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                        obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                        nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
                        tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
                        quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos
                        sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam
                        recusandae alias error harum maxime adipisci amet laborum. Perspiciatis
                        minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit
                        quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur
                        fugiat, temporibus enim commodi iusto libero magni deleniti quod quam
                        consequuntur! Commodi minima excepturi repudiandae velit hic maxime
                        doloremque. Quaerat provident commodi consectetur veniam similique ad
                        earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo
                        fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore
                        suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium
                        modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam
                        totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam
                        quasi aliquam eligendi, placeat qui corporis!
                    </p>
                </div>
            </Main>
        </div>
    );
};

export default Show;