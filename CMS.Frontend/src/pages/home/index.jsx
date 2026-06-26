import React, { useState, useEffect } from 'react';
import { productService } from '../../services/productService';
import { blogService } from '../../services/blogService';
import CategoryMenu from './CategoryMenu';
import HeroBanner from './HeroBanner';
import ProductGrid from './ProductGrid';
import LatestBlog from './LatestBlog';
import './HomePage.css';

function HomePage() {
  const [allProducts, setAllProducts] = useState([]);
  const [displayProducts, setDisplayProducts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  
  const [activeTab, setActiveTab] = useState('new');

  useEffect(() => {
    // 1. Lấy sản phẩm
    productService.getProducts(1, 100)
      .then(res => {
        const productsData = res.data.items || [];
        setAllProducts(productsData);
        const news = [...productsData].sort((a, b) => b.id - a.id).slice(0, 12);
        setDisplayProducts(news);
        setLoadingProducts(false);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
        setLoadingProducts(false);
      });

    // 2. Lấy tin tức
    blogService.getPosts(1, 3)
      .then(res => {
        const postsData = res.data.items || [];
        const latestPosts = postsData.sort((a, b) => b.id - a.id).slice(0, 3);
        setPosts(latestPosts);
        setLoadingPosts(false);
      })
      .catch(error => {
        console.error("Error fetching posts:", error);
        setLoadingPosts(false);
      });

    // 3. Lấy danh mục
    productService.getCategories()
      .then(res => {
        setCategories(res.data);
        setLoadingCategories(false);
      })
      .catch(error => {
        console.error("Error fetching categories:", error);
        setLoadingCategories(false);
      });
  }, []);

  // Xử lý chuyển tab Sản phẩm mới / Sắp phát hành
  useEffect(() => {
    if (allProducts.length === 0) return;
    if (activeTab === 'new') {
      const news = [...allProducts].sort((a, b) => b.id - a.id).slice(0, 12);
      setDisplayProducts(news);
    } else {
      const upcoming = allProducts.filter(p => p.isUpcoming).slice(0, 12);
      setDisplayProducts(upcoming);
    }
  }, [activeTab, allProducts]);

  return (
    <main className="main-content container home-page-custom">
      <div className="home-top-section">
        <CategoryMenu categories={categories} loadingCategories={loadingCategories} />
        <HeroBanner posts={posts} allProducts={allProducts} />
      </div>

      <ProductGrid 
        displayProducts={displayProducts} 
        loadingProducts={loadingProducts} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      <LatestBlog posts={posts} loadingPosts={loadingPosts} />
    </main>
  );
}

export default HomePage;
