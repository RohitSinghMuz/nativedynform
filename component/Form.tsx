import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

interface State {
  firstName: string;
  email: string;
  password: string;
  confirmPassword: string;
  mobile: string;
}

interface Errors {
  firstName: string;
  email: string;
  password: string;
  mobile: string;
  confirmPassword: string;
}

const App: React.FC = () => {
  const [fields, setFields] = useState<State>({
    firstName: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobile: '',
  });

  const [errors, setErrors] = useState<Errors>({
    firstName: '',
    email: '',
    password: '',
    mobile: '',
    confirmPassword: '',
  });

  const validate = (name: keyof State, value: string): string => {
    switch (name) {
      case 'firstName':
        if (!value || value.trim() === '') {
          return 'First name is Required';
        } else if (value.length < 3) {
          return 'First name should be at least 3 characters';
        }
        return '';
      case 'email':
        if (!value) {
          return 'Email is Required';
        } else if (
          !value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
        ) {
          return 'Enter a valid email address';
        }
        return '';
      case 'mobile':
        if (!value || value.trim() === '') {
          return 'Mobile number is Required';
        } else if (!value.match(/^[6-9]\d{9}$/)) {
          return 'Enter a valid mobile number';
        }
        return '';
      case 'password':
        if (!value) {
          return 'Password is Required';
        } else if (value.length < 8 || value.length > 15) {
          return 'Password should be 8 to 15 characters';
        } else if (!value.match(/[a-z]/g)) {
          return 'Please include at least one lowercase character';
        } else if (!value.match(/[A-Z]/g)) {
          return 'Please include at least one uppercase character';
        } else if (!value.match(/[0-9]/g)) {
          return 'Please include at least one digit';
        }
        return '';
      case 'confirmPassword':
        if (!value) {
          return 'Confirm Password Required';
        } else if (value !== fields.password) {
          return 'Passwords do not match';
        }
        return '';
      default:
        return '';
    }
  };

  const handleUserInput = (name: keyof State, value: string) => {
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: validate(name, value),
    }));
    setFields(prevFields => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    let validationErrors: Partial<Errors> = {};

    Object.keys(fields).forEach(name => {
      const error = validate(name as keyof State, fields[name as keyof State]);
      if (error && error.length > 0) {
        validationErrors[name as keyof Errors] = error;
      }
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors as Errors);
      return;
    }

    if (fields.firstName && fields.email && fields.password && fields.mobile) {
      const data = {
        firstName: fields.firstName,
        email: fields.email,
        password: fields.password,
        mobile: fields.mobile,
      };
      console.log('----data----', data);
    }
  };
  return (
    <View style={{backgroundColor: '#FFFFFF', flex: 1}}>
      <Text style={Styles.nameTextStyle}>Form</Text>
      <View>
        <TextInput
          style={Styles.textInputStyle}
          value={fields.firstName}
          onChangeText={value => handleUserInput('firstName', value)}
          placeholder="Enter first name"
          placeholderTextColor="#909090"
        />
        <Text style={Styles.nameTextStyleError}>{errors.firstName}</Text>
      </View>
      <View>
        <TextInput
          style={Styles.textInputStyle}
          value={fields.email}
          onChangeText={value => handleUserInput('email', value)}
          placeholder="Enter email address"
          placeholderTextColor="#909090"
        />
        <Text style={Styles.nameTextStyleError}>{errors.email}</Text>
      </View>
      <View>
        <TextInput
          style={Styles.textInputStyle}
          value={fields.mobile}
          onChangeText={value => handleUserInput('mobile', value)}
          placeholder=" Enter mobile"
          maxLength={10}
          placeholderTextColor="#909090"
        />
        <Text style={Styles.nameTextStyleError}>{errors.mobile}</Text>
      </View>
      <View>
        <TextInput
          style={Styles.textInputStyle}
          value={fields.password}
          onChangeText={value => handleUserInput('password', value)}
          placeholder=" Enter password"
          placeholderTextColor="#909090"
        />
        <Text style={Styles.nameTextStyleError}>{errors.password}</Text>
      </View>
      <View>
        <TextInput
          style={Styles.textInputStyle}
          value={fields.confirmPassword}
          onChangeText={value => handleUserInput('confirmPassword', value)}
          placeholder="Enter confirm password"
          placeholderTextColor="#909090"
        />
        <Text style={Styles.nameTextStyleError}>{errors.confirmPassword}</Text>
      </View>
      <TouchableOpacity style={{alignSelf: 'center'}} onPress={handleSubmit}>
        <Text style={Styles.nameTextStyleBtn}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;

const Styles = StyleSheet.create({
  nameTextStyle: {
    fontSize: 22,
    fontFamily: 'poppins',
    color: 'black',
    margin: 5,
    marginHorizontal: 20,
  },
  nameTextStyleBtn: {
    fontSize: 28,
    fontFamily: 'poppins',
    color: '#f0f0f0',
    margin: 5,
    marginHorizontal: 20,
    backgroundColor: '#ff7d10',
    paddingHorizontal: 40,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ff7d10',
  },
  nameTextStyleError: {
    fontSize: 22,
    fontFamily: 'poppins',
    color: 'black',
    marginHorizontal: 20,
  },

  textInputStyle: {
    borderColor: '#f0f0f0',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    color: 'black',
    borderWidth: 2,
    marginHorizontal: 20,
    fontSize: 22,
    borderRadius: 10,
  },
});
