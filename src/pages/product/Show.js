import React, { useEffect, useState, useCallback } from 'react'
import { ChevronLeft } from 'react-feather'
import { Link } from 'react-router-dom'
import { GrayButton } from '../../components/button/Index'
import { Layout, Main } from '../../components/layout/Index'
import { Loader } from '../../components/loader/Index'
import Gallery from 'react-photo-gallery'
import Carousel, { Modal, ModalGateway } from "react-images";


const Show = () => {
    const [loading, setLoading] = useState(true)
    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false)

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
        },
        {
            src: "https://api.eazybest.com/upload/products/additional/product-1625761434576.png",
            width: 1,
            height: 1
        }
    ]

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [])

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
            </Main>
        </div>
    );
};

export default Show;