import "../style/skeleton.css";

// Generic skeleton element
export function Skeleton({ width, height, borderRadius = "4px", className = "" }) {
  return (
    <div
      className={`skeleton ${className}`}
      style={{
        width: width || "100%",
        height: height || "20px",
        borderRadius,
      }}
    />
  );
}

// Product card skeleton
export function ProductCardSkeleton() {
  return (
    <div className="product-card-skeleton">
      <div className="skeleton-image skeleton" />
      <div className="skeleton-content">
        <Skeleton height="20px" width="80%" />
        <Skeleton height="16px" width="50%" />
        <Skeleton height="40px" width="100%" borderRadius="8px" />
      </div>
    </div>
  );
}

// Product grid skeleton (multiple cards)
export function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className="product-grid">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}

// Product details page skeleton
export function ProductDetailsSkeleton() {
  return (
    <div className="product-details-skeleton">
      <div className="skeleton-gallery">
        <div className="skeleton-main-image skeleton" />
        <div className="skeleton-thumbnails">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="skeleton-thumbnail skeleton" />
          ))}
        </div>
      </div>
      <div className="skeleton-info">
        <Skeleton height="36px" width="70%" />
        <Skeleton height="20px" width="40%" />
        <Skeleton height="28px" width="30%" />
        <div className="skeleton-sizes">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} height="50px" width="50px" borderRadius="8px" />
          ))}
        </div>
        <Skeleton height="50px" width="100%" borderRadius="8px" />
        <Skeleton height="100px" width="100%" />
      </div>
    </div>
  );
}

// Category cards skeleton
export function CategorySkeleton({ count = 4 }) {
  return (
    <div className="categorylist">
      {Array.from({ length: count }).map((_, index) => (
        <div className="category-skeleton" key={index}>
          <div className="skeleton-category-image skeleton" />
          <Skeleton height="20px" width="60%" />
        </div>
      ))}
    </div>
  );
}

// Spinner loader for buttons and small areas
export function Spinner({ size = 24, color = "#fff" }) {
  return (
    <div
      className="spinner"
      style={{
        width: size,
        height: size,
        borderColor: `${color}33`,
        borderTopColor: color,
      }}
    />
  );
}

// Full page loading overlay
export function PageLoader({ message = "Loading..." }) {
  return (
    <div className="page-loader">
      <div className="page-loader-content">
        <div className="page-spinner" />
        <p>{message}</p>
      </div>
    </div>
  );
}
