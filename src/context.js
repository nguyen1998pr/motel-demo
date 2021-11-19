import React, { Component } from "react";
import * as apiServices from "./store/motel/services";

const ApartmentContext = React.createContext();

export default class ApartmentProvider extends Component {
  state = {
    apartments: [],
    sortedApartments: [],
    featuredApartments: [],
    userInfo: { infoLoading: true },
    apartmentAction: { isEdit: false, isCreate: false, isDelete: false },
    loading: true,
    login: false,
    //
    type: "all",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false,
  };

  ApartmentList() {
    const allApartment = apiServices.allApartment();
    allApartment
      .then((res) => {
        let apartments = this.formatData(res.data.obj);
        let featuredApartments = apartments.filter(
          (apartment) => apartment.featured === true
        );
        //
        let maxPrice = Math.max(...apartments.map((item) => item.price));
        let maxSize = Math.max(...apartments.map((item) => item.size));
        this.setState((s) => ({
          ...s,
          apartments,
          featuredApartments,
          sortedApartments: apartments,
          loading: false,
          price: maxPrice,
          maxPrice,
          maxSize,
        }));
      })
      .catch((err) => {});
  }

  UserInfo() {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      const userInfo = apiServices.userInfo();
      userInfo
        .then((res) => {
          this.setState((s) => ({
            ...s,
            userInfo: { infoLoading: false, ...res.data.user },
            login: true,
          }));
        })
        .catch((err) => {
          this.setState((s) => ({
            ...s,
            userInfo: { infoLoading: false },
            login: false,
          }));
        });
    } else {
      this.setState((s) => ({
        ...s,
        userInfo: { infoLoading: false },
        login: false,
      }));
    }
  }

  componentDidMount() {
    this.UserInfo();
    this.ApartmentList();
  }

  formatData(items) {
    let tempItems = items.map((item) => {
      //let id = item.sys.id;
      let id = item._id;
      let images = item.fields.images.map(
        (image) =>
          `${process.env.REACT_APP_API_URL}/uploads/properties/${image.name}`
      );

      let apartment = { ...item.fields, images, id };
      return apartment;
    });
    return tempItems;
  }

  getApartment = (id) => {
    let tempApartments = [...this.state.apartments];
    const apartment = tempApartments.find((apartment) => apartment.id === id);
    return apartment;
  };

  getLoginStatus = () => {
    return this.state.login;
  };

  getUserStatus = () => {
    return this.state.userInfo;
  };

  getApartmentActionStatus = () => {
    return this.state.apartmentAction;
  };

  handleLogin = (event) => {
    if (event) {
      this.setState((s) => ({
        ...s,
        login: event.isLogin,
        userInfo: event.userInfo,
      }));
    }
  };

  handleEditApart = () => {
    this.setState((s) => ({
      ...s,
      apartmentAction: {
        ...s.apartmentAction,
        isEdit: !s.apartmentAction.isEdit,
      },
    }));
  };

  handleCreateApartContext = () => {
    this.setState((s) => ({
      ...s,
      apartmentAction: {
        ...s.apartmentAction,
        isCreate: !s.apartmentAction.isCreate,
      },
    }));
  };

  handleDeleteApartContext = () => {
    this.setState((s) => ({
      ...s,
      apartmentAction: {
        ...s.apartmentAction,
        isDelete: !s.apartmentAction.isDelete,
      },
    }));
  };

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState(
      {
        [name]: value,
      },
      this.filterApartments
    );
  };

  filterApartments = () => {
    let {
      apartments,
      type,
      capacity,
      price,
      minSize,
      maxSize,
      breakfast,
      pets,
    } = this.state;

    let tempApartments = [...apartments];
    // transform values
    // get capacity
    capacity = parseInt(capacity);
    price = parseInt(price);
    // filter by type
    if (type !== "all") {
      tempApartments = tempApartments.filter(
        (apartment) => apartment.type === type
      );
    }
    // filter by capacity
    if (capacity !== 1) {
      tempApartments = tempApartments.filter(
        (apartment) => apartment.capacity >= capacity
      );
    }
    // filter by price
    tempApartments = tempApartments.filter(
      (apartment) => apartment.price <= price
    );
    //filter by size
    tempApartments = tempApartments.filter(
      (apartment) => apartment.size >= minSize && apartment.size <= maxSize
    );
    //filter by breakfast
    if (breakfast) {
      tempApartments = tempApartments.filter(
        (apartment) => apartment.breakfast === true
      );
    }
    //filter by pets
    if (pets) {
      tempApartments = tempApartments.filter(
        (apartment) => apartment.pets === true
      );
    }
    this.setState({
      sortedApartments: tempApartments,
    });
  };

  render() {
    return (
      <ApartmentContext.Provider
        value={{
          ...this.state,
          getApartment: this.getApartment,
          getLoginStatus: this.getLoginStatus,
          getUserStatus: this.getUserStatus,
          getUserLoading: this.getUserLoading,
          getApartmentActionStatus: this.getApartmentActionStatus,
          handleChange: this.handleChange,
          handleLogin: this.handleLogin,
          handleEditApart: this.handleEditApart,
          handleCreateApartContext: this.handleCreateApartContext,
          handleDeleteApartContext: this.handleDeleteApartContext,
        }}
      >
        {this.props.children}
      </ApartmentContext.Provider>
    );
  }
}
const ApartmentConsumer = ApartmentContext.Consumer;

export { ApartmentProvider, ApartmentConsumer, ApartmentContext };

export function withApartmentConsumer(Component) {
  return function ConsumerWrapper(props) {
    return (
      <ApartmentConsumer>
        {(value) => <Component {...props} context={value} />}
      </ApartmentConsumer>
    );
  };
}
