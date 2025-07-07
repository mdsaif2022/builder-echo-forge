import React, { createContext, useContext, useState, ReactNode } from "react";

export interface BlogPost {
  id: number;
  title: string;
  author: {
    name: string;
    email: string;
    avatar: string | null;
  };
  content: string;
  excerpt: string;
  status: "pending" | "approved" | "rejected" | "draft";
  submissionDate: string;
  publishDate?: string;
  rejectionReason?: string;
  category: string;
  readTime: string;
  likes: number;
  comments: number;
  views: number;
  images: string[];
  tags: string[];
}

interface BlogContextType {
  blogPosts: BlogPost[];
  addBlogPost: (post: Omit<BlogPost, "id" | "submissionDate">) => void;
  updateBlogPost: (id: number, post: Partial<BlogPost>) => void;
  deleteBlogPost: (id: number) => void;
  approveBlogPost: (id: number, adminNotes?: string) => void;
  rejectBlogPost: (id: number, reason: string, adminNotes?: string) => void;
  getBlogPostById: (id: number) => BlogPost | undefined;
  getPendingPosts: () => BlogPost[];
  getApprovedPosts: () => BlogPost[];
  getRejectedPosts: () => BlogPost[];
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

const initialBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "My Journey Through the Sundarbans",
    author: {
      name: "John Doe",
      email: "john@email.com",
      avatar: null,
    },
    content:
      "The Sundarbans mangrove forest was truly a magical experience. From the moment we entered the boat, I knew this was going to be special. The dense mangrove canopy created natural tunnels as we navigated through the narrow channels...",
    excerpt:
      "An unforgettable experience spotting Bengal tigers and exploring the world's largest mangrove forest.",
    status: "approved",
    submissionDate: "2024-01-15",
    publishDate: "2024-01-16",
    category: "Adventure",
    readTime: "5 min read",
    likes: 45,
    comments: 12,
    views: 387,
    images: ["sundarbans1.jpg", "sundarbans2.jpg"],
    tags: ["Sundarbans", "Wildlife", "Adventure", "Bengal Tiger"],
  },
  {
    id: 2,
    title: "Tea Gardens and Morning Mist in Srimangal",
    author: {
      name: "Jane Smith",
      email: "jane@email.com",
      avatar: null,
    },
    content:
      "Waking up at dawn in Srimangal to witness the morning mist rolling over the tea gardens is something that will stay with me forever. The rolling hills covered in emerald green tea bushes...",
    excerpt:
      "Walking through the rolling hills of tea gardens while learning about local tea culture.",
    status: "pending",
    submissionDate: "2024-01-14",
    category: "Culture",
    readTime: "4 min read",
    likes: 0,
    comments: 0,
    views: 0,
    images: ["tea1.jpg"],
    tags: ["Srimangal", "Tea", "Culture", "Nature"],
  },
  {
    id: 3,
    title: "Cox's Bazar Sunset Experience",
    author: {
      name: "Mike Johnson",
      email: "mike@email.com",
      avatar: null,
    },
    content:
      "The world's longest natural sea beach offers some of the most spectacular sunsets I've ever witnessed. As the golden hour approached, the entire beach transformed into a canvas of colors...",
    excerpt:
      "Witnessing the golden sunrise over the world's longest natural beach was truly magical.",
    status: "approved",
    submissionDate: "2024-01-13",
    publishDate: "2024-01-13",
    category: "Beach",
    readTime: "3 min read",
    likes: 24,
    comments: 8,
    views: 156,
    images: ["coxsbazar1.jpg", "coxsbazar2.jpg", "coxsbazar3.jpg"],
    tags: ["Cox's Bazar", "Beach", "Sunset", "Photography"],
  },
  {
    id: 4,
    title: "Exploring Old Dhaka's Hidden Gems",
    author: {
      name: "Sarah Ahmed",
      email: "sarah@email.com",
      avatar: null,
    },
    content:
      "Old Dhaka is a treasure trove of history, culture, and architectural marvels. Walking through the narrow lanes of Old Dhaka feels like traveling back in time...",
    excerpt:
      "Discovering ancient architecture, vibrant markets, and rich Mughal heritage in Old Dhaka.",
    status: "approved",
    submissionDate: "2024-01-10",
    publishDate: "2024-01-11",
    category: "History",
    readTime: "6 min read",
    likes: 42,
    comments: 15,
    views: 298,
    images: ["olddhaka1.jpg", "olddhaka2.jpg"],
    tags: ["Dhaka", "History", "Architecture", "Culture"],
  },
  {
    id: 5,
    title: "Inappropriate Content Test",
    author: {
      name: "Bad User",
      email: "bad@email.com",
      avatar: null,
    },
    content:
      "This is a test post with inappropriate content that should be rejected...",
    excerpt: "Test post that should be rejected",
    status: "rejected",
    submissionDate: "2024-01-12",
    rejectionReason: "Inappropriate content and language",
    category: "Other",
    readTime: "1 min read",
    likes: 0,
    comments: 0,
    views: 0,
    images: [],
    tags: [],
  },
  {
    id: 6,
    title: "Food Adventures in Bangladesh",
    author: {
      name: "Maria Rodriguez",
      email: "maria@email.com",
      avatar: null,
    },
    content:
      "Bangladesh cuisine is a delightful journey of flavors and spices. From street food to traditional dishes, every meal tells a story...",
    excerpt:
      "Exploring the rich culinary heritage of Bangladesh through local markets and traditional recipes.",
    status: "approved",
    submissionDate: "2024-01-09",
    publishDate: "2024-01-10",
    category: "Food",
    readTime: "7 min read",
    likes: 38,
    comments: 12,
    views: 234,
    images: ["food1.jpg", "food2.jpg"],
    tags: ["Food", "Culture", "Street Food", "Traditional"],
  },
];

export function BlogProvider({ children }: { children: ReactNode }) {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(initialBlogPosts);

  const addBlogPost = (newPost: Omit<BlogPost, "id" | "submissionDate">) => {
    const post: BlogPost = {
      ...newPost,
      id: Math.max(...blogPosts.map((p) => p.id), 0) + 1,
      submissionDate: new Date().toISOString().split("T")[0],
    };
    setBlogPosts((prev) => [...prev, post]);
    return post;
  };

  const updateBlogPost = (id: number, updatedPost: Partial<BlogPost>) => {
    setBlogPosts((prev) =>
      prev.map((post) => (post.id === id ? { ...post, ...updatedPost } : post)),
    );
  };

  const deleteBlogPost = (id: number) => {
    setBlogPosts((prev) => prev.filter((post) => post.id !== id));
  };

  const approveBlogPost = (id: number, adminNotes?: string) => {
    setBlogPosts((prev) =>
      prev.map((post) =>
        post.id === id
          ? {
              ...post,
              status: "approved" as const,
              publishDate: new Date().toISOString().split("T")[0],
            }
          : post,
      ),
    );
  };

  const rejectBlogPost = (id: number, reason: string, adminNotes?: string) => {
    setBlogPosts((prev) =>
      prev.map((post) =>
        post.id === id
          ? {
              ...post,
              status: "rejected" as const,
              rejectionReason: reason,
            }
          : post,
      ),
    );
  };

  const getBlogPostById = (id: number) => {
    return blogPosts.find((post) => post.id === id);
  };

  const getPendingPosts = () => {
    return blogPosts.filter((post) => post.status === "pending");
  };

  const getApprovedPosts = () => {
    return blogPosts.filter((post) => post.status === "approved");
  };

  const getRejectedPosts = () => {
    return blogPosts.filter((post) => post.status === "rejected");
  };

  const value: BlogContextType = {
    blogPosts,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,
    approveBlogPost,
    rejectBlogPost,
    getBlogPostById,
    getPendingPosts,
    getApprovedPosts,
    getRejectedPosts,
  };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
}

export function useBlogs() {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error("useBlogs must be used within a BlogProvider");
  }
  return context;
}
