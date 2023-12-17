import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';

interface State {
  firstName: string;
  lastName: string;
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
const options = [
  {label: 'Metriculation', value: 'Metriculation'},
  {label: 'Intermediate', value: 'Intermediate'},
  {label: 'Graducate', value: 'Graducate'},
];

const App: React.FC = () => {
  const [fields, setFields] = useState<State>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobile: '',
  });

  const [gender, setGender] = useState('male');
  const [qualification, setQualification] = useState('');

  const [errors, setErrors] = useState<Errors>({
    firstName: '',
    email: '',
    password: '',
    mobile: '',
    confirmPassword: '',
  });
  const handleValueChange = (itemValue: any) => {
    setQualification(itemValue);
  };

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
        lastName: fields.lastName,
        gender: gender,
        qualification: qualification,
      };
      console.log('----data----', data);
    }
  };
  return (
    <View style={Styles.container}>
      <Text style={Styles.titleStyle}>Form</Text>
      <View>
        <TextInput
          style={Styles.textInputStyle}
          value={fields.firstName}
          onChangeText={value => handleUserInput('firstName', value)}
          placeholder="Enter first name"
          placeholderTextColor="#909090"
        />
        {errors.firstName ? (
          <Text style={Styles.nameTextStyleError}>{errors.firstName}</Text>
        ) : null}
      </View>

      <View>
        <TextInput
          style={Styles.textInputStyle}
          value={fields.lastName}
          onChangeText={value => handleUserInput('lastName', value)}
          placeholder="Enter last name"
          placeholderTextColor="#909090"
        />
      </View>

      <View>
        <TextInput
          style={Styles.textInputStyle}
          value={fields.email}
          onChangeText={value => handleUserInput('email', value)}
          placeholder="Enter email address"
          placeholderTextColor="#909090"
        />
        {errors.email ? (
          <Text style={Styles.nameTextStyleError}>{errors.email}</Text>
        ) : null}
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
        {errors.mobile ? (
          <Text style={Styles.nameTextStyleError}>{errors.mobile}</Text>
        ) : null}
      </View>

      <View style={Styles.genderqualiViewStyle}>
        <View style={Styles.radioButtonViewStyle}>
          <Text style={Styles.label}>Select Gender:</Text>
          <View style={Styles.radioButtonContainer}>
            <RadioButton.Group
              onValueChange={newValue => setGender(newValue)}
              value={gender}>
              <View style={Styles.radioButton}>
                <Text style={Styles.label}>Male</Text>
                <RadioButton value="male" />
                <Text style={Styles.label}>Female</Text>
                <RadioButton value="female" />
              </View>
            </RadioButton.Group>
          </View>
        </View>

        <View>
          <Text style={Styles.qualificationStyle}>Qualification</Text>
          <Picker
            selectedValue={qualification}
            style={Styles.pickerStyle}
            onValueChange={handleValueChange}>
            {options.map(option => (
              <Picker.Item
                key={option.value}
                label={option.label}
                value={option.value}
              />
            ))}
          </Picker>
        </View>
      </View>
      <View>
        <TextInput
          style={Styles.textInputStyle}
          value={fields.password}
          onChangeText={value => handleUserInput('password', value)}
          placeholder=" Enter password"
          placeholderTextColor="#909090"
        />
        {errors.password ? (
          <Text style={Styles.nameTextStyleError}>{errors.password}</Text>
        ) : null}
      </View>
      <View>
        <TextInput
          style={Styles.textInputStyle}
          value={fields.confirmPassword}
          onChangeText={value => handleUserInput('confirmPassword', value)}
          placeholder="Enter confirm password"
          placeholderTextColor="#909090"
        />
        {errors.confirmPassword ? (
          <Text style={Styles.nameTextStyleError}>
            {errors.confirmPassword}
          </Text>
        ) : null}
      </View>
      <TouchableOpacity style={{alignSelf: 'center'}} onPress={handleSubmit}>
        <Text style={Styles.nameTextStyleBtn}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontSize: 16,
    fontFamily: 'poppins',
    color: 'red',
    marginHorizontal: 20,
  },

  textInputStyle: {
    borderColor: '#f0f0f0',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    color: 'black',
    borderWidth: 2,
    marginHorizontal: 20,
    fontSize: 16,
    borderRadius: 10,
    marginVertical: 10,
  },
  titleStyle: {
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 22,
    fontWeight: 'bold',
    margin: 10,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  qualificationStyle: {
    fontSize: 18,
    paddingHorizontal: 10,
    marginHorizontal: 20,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButtonViewStyle: {
    paddingHorizontal: 10,
    color: 'black',
    marginHorizontal: 20,
    fontSize: 18,
  },
  pickerStyle: {
    width: 200,
    height: 40,
    marginHorizontal: 20,
  },
  genderqualiViewStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
    marginVertical: 5,
  },
});
