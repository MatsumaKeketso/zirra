import React, { useEffect, useState } from 'react'
import { View, SafeAreaView, StyleSheet, Dimensions, Text, ScrollView, StatusBar, KeyboardAvoidingView, PermissionsAndroid, Platform, Image, TouchableOpacity } from 'react-native'
import InputButton from '../Components/Button/Button'
import InputText from '../Components/TextInput/TextInput'
import Typography from '../Components/Typography/Typography'
import globals from './globals.styles';
import DatePicker from 'react-native-date-picker'
import { launchImageLibrary } from 'react-native-image-picker';
import Radionbutton from '../Components/RadioButton/Radionbutton'
import incidentRadio from '../Components/incidentRadios'
import reporterRadios from '../Components/reporterRadios'
import storage from '@react-native-firebase/storage'
import firestore from '@react-native-firebase/firestore'
import ProgressBar from '../Components/ProgressBar/ProgressBar'
import { check, checkNotifications, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import CheckMark from '../Components/CheckMark/CheckMark'
import DeviceInfo from 'react-native-device-info';
import AlertBox from '../Components/AlertBox/AlertBox'
const WIDTH = Dimensions.get('window').width
const incidentFormData = {
    whatProvince: '',
    whatTown: '',
    additionalDetails: '',
    video: '',
    image: '',
    isHappening: '',
    dateOfIncident: '',
    personDetails: '',
    personFullName: '',
    isTwoPeople: '',
    secondPersonFullName: '',
    infoAboutThem: '',
    contactNumberOfAgainst: '',
    contactEmailOfAgainst: '',
    wasWitness: '',
    witnessDetails: '',
    whatHappened: '',
    isReported: '',
    didOrganisationResolve: '',
    needInterpreter: '',
    relief: '',
    reliefDetails: '',
    herdAboutUs: ''
}
const reporterFormData = {
    anonymousReport: false,
    name: '',
    surname: '',
    ID: '',
    dateOfBirth: '',
    race: '',
    otherRace: '',
    gender: '',
    otherGender: '',
    province: '',
    town: '',
    email: '',
    phoneNumber: '',
    altPhoneNumber: '',
    faxNumber: '',
    communication: '',
    contactPerson: ''
}
const Report = (props) => {
    const [imageProgress, setImageProgress] = useState(0)
    const [imageUploadState, setImageUploadState] = useState('')
    const [videoProgress, setVideoProgress] = useState(0)
    const [videoUploadState, setVideoUploadState] = useState('')
    const [isHappening, setIsHappening] = useState('')
    const [activeSlide, setActiveSlide] = useState(0)
    const [date, setDate] = useState(new Date())
    const [openDate, setOpenDate] = useState(false)
    const [openReporterDate, setOpenReporterDate] = useState(false)
    const [incidentForm, setIncidentForm] = useState(incidentFormData)
    const [reporterForm, setReporterForm] = useState(reporterFormData)
    // Upload Image
    const selectImage = async () => {
        const options = {
            mediaType: 'photo',
            includeBase64: true,
            selectionLimit: 1,
            includeExtra: true
        }
        const result = await launchImageLibrary(options, (obj) => {
            console.log(obj)
            const reference = storage().ref(`/images/${obj.fileName}`)
            const task = reference.putFile(obj.uri)
            task.on('state_changed', snap => {
                let progress = (snap.bytesTransferred / snap.totalBytes) * 100
                setImageProgress(progress)
                switch (snap.state) {
                    case 'paused':
                        setImageUploadState('Paused')
                        break;
                    case 'running':
                        setImageUploadState('Uploading')
                        break;
                    case 'success':
                        setImageUploadState('Image Uploaded')
                        reference.getDownloadURL().then(res => {
                            setIncidentForm(prev => ({
                                ...prev,
                                image: res
                            }))
                        })

                        break;

                }
            })

        })
    }
    // Upload Video
    const selectVideo = async () => {
        const options = {
            mediaType: 'video',
            includeExtra: true
        }
        const result = await launchImageLibrary(options, (obj) => {
            console.log(obj)
            const reference = storage().ref(`/videos/${obj.fileName}`)
            const task = reference.putFile(obj.uri)
            task.on('state_changed', snap => {
                let progress = (snap.bytesTransferred / snap.totalBytes) * 100
                setImageProgress(progress)
                switch (snap.state) {
                    case 'paused':
                        setImageUploadState('Paused')
                        break;
                    case 'running':
                        setImageUploadState('Uploading')
                        break;
                    case 'success':
                        setImageUploadState('Image Uploaded')
                        reference.getDownloadURL().then(res => {
                            setIncidentForm(prev => ({
                                ...prev,
                                video: res
                            }))
                        })
                        break;
                }
            })
            task.catch(err => {
                console.log(err)
            })

        })

    }
    const requestCameraPermission = async () => {
        try {
            //    Check for permissions
            check(PERMISSIONS.ANDROID.ACCESS_MEDIA_LOCATION).then((res) => {
                switch (res) {
                    case RESULTS.UNAVAILABLE:
                        console.log('This feature is not available (on this device / in this context)');
                        break;
                    case RESULTS.DENIED:
                        console.log('The permission has not been requested / is denied but requestable');
                        const Rationale = {
                            title: 'Storage Request',
                            message: 'Zirra needs access to your local storage.',
                            buttonPositive: 'Okay',
                            buttonNegative: 'No',
                        }
                        request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE, Rationale).then(r => {
                            switch (r) {
                                case RESULTS.UNAVAILABLE:
                                    console.log('This feature is not available (on this device / in this context)');
                                    break;
                                case RESULTS.DENIED:
                                    console.log('The permission has not been requested / is denied but requestable');
                                    break;
                                case RESULTS.LIMITED:
                                    console.log('The permission is limited: some actions are possible');
                                    break;
                                case RESULTS.GRANTED:
                                    console.log('The permission is granted');
                                    selectVideo()
                                    break;
                                case RESULTS.BLOCKED:
                                    console.log('The permission is denied and not requestable anymore');
                                    break;
                            }
                        })
                        break;
                    case RESULTS.LIMITED:
                        console.log('The permission is limited: some actions are possible');
                        break;
                    case RESULTS.GRANTED:
                        console.log('The permission is granted');
                        check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then(result => {
                            switch (result) {
                                case RESULTS.UNAVAILABLE:
                                    console.log('This feature is not available (on this device / in this context)');
                                    break;
                                case RESULTS.DENIED:
                                    console.log('The permission has not been requested / is denied but requestable');
                                    break;
                                case RESULTS.LIMITED:
                                    console.log('The permission is limited: some actions are possible');
                                    break;
                                case RESULTS.GRANTED:
                                    console.log('The permission is granted');
                                    selectVideo()
                                    break;
                                case RESULTS.BLOCKED:
                                    console.log('The permission is denied and not requestable anymore');
                                    break;
                            }
                        })
                        break;
                    case RESULTS.BLOCKED:
                        console.log('The permission is denied and not requestable anymore');
                        break;
                }
            })
        } catch (err) {
            console.warn(err);
        }
    };

    const onChange = (nativeEvent) => {
        const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)
        if (slide != activeSlide) {
            setActiveSlide(slide)
        }
    }
    const submitInformation = (payload) => {
        var deviceId = ''
        DeviceInfo.getFingerprint().then(res => {
            console.log(res, payload)
            firestore().collection('reports').add(payload).then((doc) => {
            }).catch(err => console.log(err))
        })
        // 
    }
    useEffect(() => {
        // 
        console.log(reporterForm);
    }, [reporterForm])
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#FF7433" />
            <AlertBox open={false} />
            <DatePicker
                modal
                mode='date'
                theme="light"
                open={openDate}
                androidVariant="iosClone"
                date={date}
                onConfirm={(date) => {
                    setOpenDate(false)
                    const dateFormat = new Date(date)
                    setIncidentForm(prev => ({
                        ...prev,
                        dateOfIncident: dateFormat.toDateString()
                    }))
                    setDate(date)
                }}
                onCancel={() => {
                    setOpenDate(false)
                }} />
            <DatePicker
                modal
                mode='date'
                theme="light"
                open={openReporterDate}
                androidVariant="iosClone"
                date={date}
                onConfirm={(date) => {
                    setOpenReporterDate(false)
                    const dateFormat = new Date(date)
                    setReporterForm(prev => ({
                        ...prev,
                        dateOfBirth: dateFormat.toDateString()
                    }))
                    setDate(date)
                }}
                onCancel={() => {
                    setOpenReporterDate(false)
                }} />
            <SafeAreaView style={styles.wrap}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.textHeader}>Zimele Racism Reporting</Text>
                    <View style={styles.bodyWrapper}>
                        <Text style={styles.textBody}>Please complete all required fields marked with (*)</Text>
                    </View>
                </View>
                {/* .... */}
                <View style={styles.stepper}>
                    <View>
                        <Typography variant="body1" text="New Report" />
                        <Typography variant="subHeader" text={activeSlide > 4 ? "Tell us about yourself" : "Incident Details"} />
                    </View>
                    <View>
                        <Typography variant="body1" text={`Step ${activeSlide > 4 ? (activeSlide) - 5 : activeSlide + 1} / ${activeSlide > 4 ? '2' : '5'}`} />
                    </View>
                </View>
                <ScrollView
                    onScroll={({ nativeEvent }) => onChange(nativeEvent)}
                    horizontal
                    pagingEnabled
                    style={{ width: '100%', flex: 1 }}>
                    {/* Slide 1 */}
                    <View style={styles.slide}>
                        <View style={styles.slideDetais}>
                            <ScrollView>

                                <InputText onChangeText={(val) => {
                                    setIncidentForm(prev => ({
                                        ...prev,
                                        whatProvince: val
                                    }))
                                }} ml={true} label="In what province did it happen? *" />


                                <InputText onChangeText={(val) => {
                                    setIncidentForm(prev => ({
                                        ...prev,
                                        whatTown: val
                                    }))
                                }} ml={true} label="In what town/city did it happen? *" />


                                <InputText onChangeText={(val) => {
                                    setIncidentForm(prev => ({
                                        ...prev,
                                        additionalDetails: val
                                    }))
                                }} ml={true} label="Additional detail to where did incident/s happen?" />

                                <View >
                                    <Typography variant="label" text="Upload Media" />
                                    <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'white' }}>
                                        <InputButton onPress={requestCameraPermission} variant="primary" text="Video" />
                                        <View style={{ width: 10, height: '100%' }} />
                                        <InputButton onPress={selectImage} variant="primary" text="Picture" />

                                    </View>
                                </View>
                                {imageProgress > 0 && (<ProgressBar state={imageUploadState} progress={imageProgress} />)}


                                <View style={{ Width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
                                    <Typography text={incidentRadio.isHappening.title} variant="label" />
                                    {
                                        incidentRadio.isHappening.options.map((c, i) => {
                                            return (<Radionbutton active={incidentForm.isHappening === c ? true : false} key={i} onPress={(el) => {
                                                setIncidentForm(prevState => ({
                                                    ...prevState,
                                                    isHappening: c
                                                }))
                                            }} label={c} />)
                                        })
                                    }
                                </View>

                            </ScrollView>

                        </View>
                    </View>
                    {/* ... */}
                    {/* Slide 2 */}
                    <View style={styles.slide}>
                        <View style={styles.slideDetais}>
                            <ScrollView>
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
                                    <View style={{ flex: 1, height: 'auto' }}>
                                        <InputText value={incidentForm.dateOfIncident} onChangeText={(val) => {
                                            setIncidentForm(prev => ({
                                                ...prev,
                                                dateOfIncident: val
                                            }))
                                        }} ml={true} label="Date of incident" />
                                    </View>
                                    <TouchableOpacity onPress={() => { setOpenDate(true) }} style={{ padding: 10, marginLeft: 10, marginBottom: 5 }}>
                                        <Image resizeMode='contain' style={{ width: 24, height: 24 }} source={require('../assets/icons/coloured/calendar-3.png')} />
                                    </TouchableOpacity>
                                </View>

                                {/* Radio Buttons */}
                                <View style={{ Width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
                                    <Typography text={incidentRadio.personDetais.title} variant="label" />
                                    {
                                        incidentRadio.personDetais.options.map((c, i) => {
                                            return (<Radionbutton active={incidentForm.personDetails === c ? true : false} key={i} onPress={(el) => {
                                                setIncidentForm(prev => ({
                                                    ...prev,
                                                    personDetails: c
                                                }))
                                            }} label={c} />)
                                        })
                                    }
                                </View>
                                {/* ... */}

                                {incidentForm.personDetails === 'Yes' && (<InputText onChangeText={(val) => {
                                    setIncidentForm(prev => ({
                                        ...prev,
                                        personFullName: val
                                    }))
                                }} ml={true} label="Persons First and Last name*" />)}

                                {/* Radio Buttons */}
                                <View style={{ Width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
                                    <Typography text={incidentRadio.isTwoPeople.title} variant="label" />
                                    {
                                        incidentRadio.isTwoPeople.options.map((c, i) => {
                                            return (<Radionbutton active={incidentForm.isTwoPeople === c ? true : false} key={i} onPress={(el) => {
                                                setIncidentForm(prev => ({
                                                    ...prev,
                                                    isTwoPeople: c
                                                }))
                                            }} label={c} />)
                                        })
                                    }
                                </View>
                                {/* ... */}
                                {incidentForm.isTwoPeople === 'Yes' && (<InputText onChangeText={val => {
                                    setIncidentForm(prev => ({
                                        ...prev,
                                        secondPersonFullName: val
                                    }))
                                }} ml={true} label="Second persons First and Last name*" />)}


                            </ScrollView>

                        </View>
                    </View>
                    {/* ... */}
                    {/* Slide 3 */}
                    <View style={styles.slide}>

                        <View style={styles.slideDetais}>
                            <ScrollView>
                                <InputText onChangeText={val => {
                                    setIncidentForm(prev => ({
                                        ...prev,
                                        infoAboutThem: val
                                    }))
                                }} ml={true} label="Any information about them" />

                                <InputText type="phone-pad" onChangeText={val => {
                                    setIncidentForm(prev => ({
                                        ...prev,
                                        contactNumberOfAgainst: val
                                    }))
                                }} ml={true} label="Contact number of the person against whom you are lodging the complaint." />

                                <InputText type="email-address" onChangeText={val => {
                                    setIncidentForm(prev => ({
                                        ...prev,
                                        contactEmailOfAgainst: val
                                    }))
                                }} ml={true} label="Contact email of the person against whom you are lodging the complaint." />


                                {/* Radio Buttons */}
                                <View style={{ Width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
                                    <Typography text={incidentRadio.wasWitness.title} variant="label" />
                                    {
                                        incidentRadio.wasWitness.options.map((c, i) => {
                                            return (<Radionbutton active={incidentForm.wasWitness === c ? true : false} key={i} onPress={(el) => {
                                                setIncidentForm(prev => ({
                                                    ...prev,
                                                    wasWitness: c
                                                }))
                                            }} label={c} />)
                                        })
                                    }
                                </View>
                                {/* ... */}
                            </ScrollView>

                        </View>




                    </View>
                    {/* ... */}
                    {/* Slide 4 */}
                    <View style={styles.slide}>
                        <View style={styles.slideDetais}>
                            <ScrollView>
                                {incidentForm.wasWitness === 'Yes' && (<InputText onChangeText={val => {
                                    setIncidentForm(prev => ({
                                        ...prev,
                                        witnessDetails: val
                                    }))
                                }} ml={true} label="Witness details" />)}

                                <InputText onChangeText={val => {
                                    setIncidentForm(prev => ({
                                        ...prev,
                                        whatHappened: val
                                    }))
                                }} ml={true} label="Tell us what happened*" />
                                {/* Radio Buttons */}
                                <View style={{ Width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
                                    <Typography text={incidentRadio.isReported.title} variant="label" />
                                    {
                                        incidentRadio.isReported.options.map((c, i) => {
                                            return (<Radionbutton active={incidentForm.isReported === c ? true : false} key={i} onPress={(el) => {
                                                setIncidentForm(prev => ({
                                                    ...prev,
                                                    isReported: c
                                                }))
                                            }} label={c} />)
                                        })
                                    }
                                </View>
                                {/* ... */}
                                {/* Radio Buttons */}
                                <View style={{ Width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
                                    <Typography text={incidentRadio.didOrganisationResolve.title} variant="label" />
                                    {
                                        incidentRadio.didOrganisationResolve.options.map((c, i) => {
                                            return (<Radionbutton active={incidentForm.didOrganisationResolve === c ? true : false} key={i} onPress={(el) => {
                                                setIncidentForm(prev => ({
                                                    ...prev,
                                                    didOrganisationResolve: c
                                                }))
                                            }} label={c} />)
                                        })
                                    }
                                </View>
                                {/* ... */}
                            </ScrollView>
                        </View>

                    </View>
                    {/* ... */}
                    {/* Slide 5 */}
                    <View style={styles.slide}>
                        <View style={styles.slideDetais}>
                            <ScrollView>
                                {/* Radio Buttons */}
                                <View style={{ Width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
                                    <Typography text={incidentRadio.needInterpreter.title} variant="label" />
                                    {
                                        incidentRadio.needInterpreter.options.map((c, i) => {
                                            return (<Radionbutton active={incidentForm.needInterpreter === c ? true : false} key={i} onPress={(el) => {
                                                setIncidentForm(prev => ({
                                                    ...prev,
                                                    needInterpreter: c
                                                }))
                                            }} label={c} />)
                                        })
                                    }
                                </View>
                                {/* ... */}
                                {/* Radio Buttons */}
                                <View style={{ Width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
                                    <Typography text={incidentRadio.relief.title} variant="label" />
                                    {
                                        incidentRadio.relief.options.map((c, i) => {
                                            return (<Radionbutton active={incidentForm.relief === c ? true : false} key={i} onPress={(el) => {
                                                setIncidentForm(prev => ({
                                                    ...prev,
                                                    relief: c
                                                }))
                                            }} label={c} />)
                                        })
                                    }
                                </View>
                                {/* ... */}
                                {incidentForm.relief === 'Other' && (<InputText onChangeText={val => {
                                    setIncidentForm(prev => ({
                                        ...prev,
                                        reliefDetails: val
                                    }))
                                }} ml={true} label="What other relief is required?" />)}

                                {/* Radio Buttons */}
                                <View style={{ Width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
                                    <Typography text={incidentRadio.herdAboutUs.title} variant="label" />
                                    {
                                        incidentRadio.herdAboutUs.options.map((c, i) => {
                                            return (<Radionbutton active={incidentForm.herdAboutUs === c ? true : false} key={i} onPress={(el) => {
                                                setIncidentForm(prev => ({
                                                    ...prev,
                                                    herdAboutUs: c
                                                }))
                                            }} label={c} />)
                                        })
                                    }
                                </View>
                                {/* ... */}
                            </ScrollView>
                        </View>

                    </View>
                    {/* ... */}

                    {/* Slide 6 */}
                    <View style={styles.slide}>
                        <View style={styles.userSlide}>
                            <ScrollView>

                                <CheckMark onValueChange={() => {
                                    setReporterForm(prev => ({
                                        ...prev,
                                        anonymousReport: !reporterForm.anonymousReport
                                    }))
                                }} value={reporterForm.anonymousReport} onPress={() => {
                                    setReporterForm(prev => ({
                                        ...prev,
                                        anonymousReport: !reporterForm.anonymousReport
                                    }))
                                }} />

                                <InputText ic="light" lc="dark" onChangeText={(val) => {
                                    setReporterForm(prev => ({
                                        ...prev,
                                        name: val
                                    }))
                                }} ml={true} label="Name" />
                                <InputText ic="light" lc="dark" onChangeText={(val) => {
                                    setReporterForm(prev => ({
                                        ...prev,
                                        surname: val
                                    }))
                                }} ml={true} label="Surname" />
                                <InputText ic="light" type="phone-pad" lc="dark" onChangeText={(val) => {
                                    setReporterForm(prev => ({
                                        ...prev,
                                        ID: val
                                    }))
                                }} ml={true} label="ID Number" />

                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
                                    <View style={{ flex: 1, height: 'auto' }}>
                                        <InputText ic="light" lc="dark" value={reporterForm.dateOfBirth} onChangeText={(val) => {
                                            setReporterForm(prev => ({
                                                ...prev,
                                                dateOfBirth: val
                                            }))
                                        }} ml={true} label="Date of Birth" />
                                    </View>
                                    <TouchableOpacity onPress={() => { setOpenReporterDate(true) }} style={{ padding: 10, marginLeft: 10, marginBottom: 5 }}>
                                        <Image resizeMode='contain' style={{ width: 24, height: 24 }} source={require('../assets/icons/coloured/calendar-3.png')} />
                                    </TouchableOpacity>
                                </View>


                                {/* Radio Buttons */}
                                <View style={{ Width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
                                    <Typography c="dark" text={reporterRadios.race.title} variant="label" />
                                    {
                                        reporterRadios.race.options.map((c, i) => {
                                            return (<Radionbutton lc="dark" active={reporterForm.race === c ? true : false} key={i} onPress={() => {
                                                setReporterForm(prev => ({
                                                    ...prev,
                                                    race: c
                                                }))
                                            }} label={c} />)
                                        })
                                    }
                                </View>
                                {/* ... */}
                                {reporterForm.race === 'Other' && (<InputText ic="light" type="phone-pad" lc="dark" onChangeText={(val) => {
                                    setReporterForm(prev => ({
                                        ...prev,
                                        otherRace: val
                                    }))
                                }} ml={true} label="Please Specify" />)}

                                {/* Radio Buttons */}
                                <View style={{ Width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
                                    <Typography c="dark" text={reporterRadios.gender.title} variant="label" />
                                    {
                                        reporterRadios.gender.options.map((c, i) => {
                                            return (<Radionbutton lc="dark" active={reporterForm.gender === c ? true : false} key={i} onPress={(el) => {
                                                setReporterForm(prev => ({
                                                    ...prev,
                                                    gender: c
                                                }))
                                            }} label={c} />)
                                        })
                                    }
                                </View>
                                {/* ... */}

                                {reporterForm.gender === 'Other' && (<InputText ic="light" type="phone-pad" lc="dark" onChangeText={(val) => {
                                    setReporterForm(prev => ({
                                        ...prev,
                                        otherGender: val
                                    }))
                                }} ml={true} label="Please Specify" />)}
                            </ScrollView>
                        </View>

                    </View>
                    {/* ... */}
                    {/* Slide 7 */}
                    <View style={styles.slide}>
                        <View style={styles.userSlide}>
                            <ScrollView>
                                <InputText ic="light" lc="dark" onChangeText={(val) => {
                                    setReporterForm(prev => ({
                                        ...prev,
                                        province: val
                                    }))
                                }} ml={true} label="Province" />
                                <InputText ic="light" lc="dark" onChangeText={(val) => {
                                    setReporterForm(prev => ({
                                        ...prev,
                                        town: val
                                    }))
                                }} ml={true} label="Town / City" />
                                <InputText type="email-address" ic="light" lc="dark" onChangeText={(val) => {
                                    setReporterForm(prev => ({
                                        ...prev,
                                        email: val
                                    }))
                                }} ml={true} label="Email Address" />
                                <InputText type="phone-pad" ic="light" lc="dark" onChangeText={(val) => {
                                    setReporterForm(prev => ({
                                        ...prev,
                                        phoneNumber: val
                                    }))
                                }} ml={true} label="Phone Number" />
                                <InputText type="phone-pad" ic="light" lc="dark" onChangeText={(val) => {
                                    setReporterForm(prev => ({
                                        ...prev,
                                        altPhoneNumber: val
                                    }))
                                }} ml={true} label="Alternative Phone Number" />
                                <InputText type="phone-pad" ic="light" lc="dark" onChangeText={(val) => {
                                    setReporterForm(prev => ({
                                        ...prev,
                                        faxNumber: val
                                    }))
                                }} ml={true} label="Fax Number" />
                                {/* Radio Buttons */}
                                <View style={{ Width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
                                    <Typography c="dark" text={reporterRadios.communication.title} variant="label" />
                                    {
                                        reporterRadios.communication.options.map((c, i) => {
                                            return (<Radionbutton lc="dark" active={reporterForm.race === c ? true : false} key={i} onPress={() => {
                                                setReporterForm(prev => ({
                                                    ...prev,
                                                    communication: c
                                                }))
                                            }} label={c} />)
                                        })
                                    }
                                </View>
                                {/* ... */}
                                <InputText ic="light" lc="dark" onChangeText={(val) => {
                                    setReporterForm(prev => ({
                                        ...prev,
                                        contactPerson: val
                                    }))
                                }} ml={true} label="Contact Person" />
                            </ScrollView>
                        </View>
                    </View>
                    {/* ... */}
                </ScrollView>
                <View style={{ paddingLeft: 20, paddingRight: 20, display: 'flex', flexDirection: 'row', backgroundColor: 'white' }}>
                    <InputButton onPress={() => { props.navigation.goBack() }} text="Cancel" />
                    <View style={{ width: 10, height: '100%' }} />
                    <View style={{ width: '70%', height: '100%' }}>
                        <InputButton onPress={() => {
                            submitInformation({ ...incidentForm, ...reporterForm })
                        }} variant="primary" text="Submit" />
                    </View>

                </View>
            </SafeAreaView>
        </View>
    )
}
const styles = StyleSheet.create({
    header: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        padding: 20,
        boxShadow: "0px 0px 39px -22px rgba(0, 0, 0, 0.25)",
        backgroundColor: "#FF7433",
        overflow: "visible",
        borderBottomEndRadius: 30,
        borderBottomStartRadius: 30,
    },
    textHeader: {
        width: "100%",
        overflow: "hidden",
        fontWeight: "500",
        fontStyle: "normal",
        fontFamily: "Montserrat-Bold",
        color: "#fff",
        fontSize: 26
    },
    bodyWrapper: {
        height: "auto", /* 54px */
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 10,
    },
    textBody: {
        fontWeight: "400",
        fontStyle: "normal",
        fontFamily: "Montserrat-Regular",
        color: "#fff",
        fontSize: 14,
    },
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: '#FAFAFA'
    },
    wrap: {
        height: '100%',
        width: '100%',
    },
    stepper: {
        // height: 50,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20
    },
    slide: {
        width: WIDTH,
        padding: 10,
    },
    slideDetais: {
        width: '100%',
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        overflow: 'hidden'
    },
    userSlide: {
        width: '100%',
        padding: 10,
        backgroundColor: '#242424',
        borderRadius: 20
    }

})
export default Report