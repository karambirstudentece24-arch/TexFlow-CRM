export const getCustomers = () => {
  const customers = localStorage.getItem("customers");
  return customers ? JSON.parse(customers) : [];
};

export const getProducts = () => {
  const products = localStorage.getItem("products");
  return products ? JSON.parse(products) : [];
};