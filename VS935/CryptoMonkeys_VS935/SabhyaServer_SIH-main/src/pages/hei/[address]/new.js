import { Form, Container, Button, Input, Message } from "semantic-ui-react";
import { useRouter } from 'next/router'
import { useCallback, useState } from "react";
import web3 from "../../../../ethereum/web3";
import Resource from "../../../../ethereum/resource";
import { create } from 'ipfs-http-client';
import SideNavLayout from "../../../styleGuide/layout/sidenav";
// import NewDownload from "./newdowload";
import InputBox from "../../../styleGuide/components/inputBox";
import styles from "./NewRequest.module.css";
import PageTwo from "../../../styleGuide/layout/onboarding/pageTwo";
import DnD from "../../../styleGuide/components/DnD";
import ImageDnD from "../../../styleGuide/components/imageDnD";
import FloatingButton from "../../../styleGuide/components/floatingButton";
import axios from 'axios';
import { Icon } from '@iconify/react';
import router from "next/router";

const NewRequest = (props) => {

    const { mc, fc, uc, ma, address } = props;
    const router = useRouter();

    // console.log(props, "my values")
    const [amount, setAmount] = useState('0');
    const [buffer, setbuffer] = useState(null);
    const [hash, setHash] = useState('');
    const [description, setDescription] = useState('');
    const [recipient, setRecipient] = useState('0xFAdade5f381d0D383C54ef4Bf5F6c2f2A116eb64');
    const [loading, setloading] = useState(false)
    const [msg, setmsg] = useState({ header: '', message: '' });
    const [resourceName, setResourceName] = useState("");
    const [categories, setCategories] = useState([]);
    const [imgLink, setImgLink] = useState(null);
    const [resourceFileName, setResourceFileName] = useState("");
    const [resourceFileSize, setResourceFileSize] = useState("");

    const onDrop = useCallback(acceptedFiles => {
        imageUpload(acceptedFiles[0]);
    }, []);

    const imageUpload = async (imgFile) => {
        try {
            if (imgFile) {
                const formInfo = new FormData();
                formInfo.append("file", imgFile);
                formInfo.append("upload_preset", "upload_img");
                formInfo.append("cloud_name", "sih-testing");

                const imgUploaded = await axios.post("https://api.cloudinary.com/v1_1/sih-testing/image/upload", formInfo)
                setImgLink(imgUploaded.data.url)
                console.log(imgLink)
            }
        }
        catch (e) {
            console.log(e)
        }
    }

    // const downloadURL = "https://sabhyaserver101.infura-ipfs.io/ipfs/QmQZa9ydrFiNc7cvZpU1csFT9pw1dHm6ay4iB6FiHwoTR8";

    const projectId = '2DXMKunfP4sLPXiLF6fPNqFXxpA';   // <---------- your Infura Project ID

    const projectSecret = 'a9f17b8ee177ce48c933ab817c4e7f97';  // <---------- your Infura Secret
    // (for security concerns, conresourceNamesider saving these values in .env files)

    const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

    const client = create({
        host: 'ipfs.infura.io',
        port: 5001,
        protocol: 'https',
        headers: {
            authorization: auth,
        },
    });



    const inputHandler = (e) => {
        const { value, name } = e.target;
        if (name == "resourceName") setResourceName((value));
        else if (name == "description") setDescription((value));
        else if (name == "amount") setAmount((value));
        else if (name == "recipient") setRecipient((value));
    }

    function categoryHandler(category) {
        let list = [...categories];
        if (list.indexOf(category) == -1)
            list.push(category);
        else
            list.splice(list.indexOf(category), 1);

        setCategories((list));
    }

    const fileHandler = event => {
        const file = event.target.files[0];
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = () => {
            setbuffer(Buffer(reader.result));
        }
        setResourceFileName((file.name));
        setResourceFileSize((file.size))
        console.log(file);
    }
    const fileUploadHandler = async (event) => {
        event.preventDefault();
        try {
            const res = await client.add(buffer);
            console.log("IPFS RES", res.path);
            setHash((res.path));
            console.log("//////hash");
            // console.log('buffer', buffer);
            // console.log(res);

            console.log(hash);
            console.log("//////hash");
        }
        catch (err) {
            console.log(err);
        }
    }

    const submitHandler = async (event) => {
        // event.preventDefault();
        if (Number(amount) < 0) {
            setloading(false);
            setmsg({
                header: 'Error',
                message: ' Please fill the amount'
            })
            return;
        }
        else if (!web3.utils.isAddress(recipient)) {
            setloading(false);
            setmsg({
                header: 'Error',
                message: ' Please enter a valid address'
            })
            return;
        }
        else if (!description.length) {
            setloading(false);
            setmsg({
                header: 'Error',
                message: ' Please enter some description for reference'
            })
            return;
        }
        else if (!hash.length) {
            setloading(false);
            setmsg({
                header: 'Error',
                message: ' Please Upload document'
            })
            return;
        }
        setloading(true);
        setmsg({ header: '', message: '' });
        try {
            setmsg({ header: "Transaction", message: "Waiting on Transaction success..." });
            const campaign = Resource(address);
            console.log(campaign);
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.uploadfile(description, hash, web3.utils.toWei(amount, 'ether'), recipient).send({
                from: accounts[0],
            });
            setmsg({ header: "Congratulations", message: "You've successfully uploaded your resources" });
            const details = {
                data: {
                    "idEth": address,
                    "name": resourceName,
                    "desc": description,
                    "file": hash,
                    "fileIdx": fc,
                    "thumbnail": imgLink,
                    "author": ["jitul", "kongon", "testing"],
                    "keyWords": ["dark", "light"],
                    "minumunContribution": amount
                },
                "_type": "institute"

            }
            var config = {
                method: 'post',
                url: 'https://gentle-lowlands-02621.herokuapp.com/hei/addNewContent',
                headers: {
                    'auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDgwYmVmZTU2ZWZiMDAxNjQ0NDM4NSIsImlhdCI6MTY2MTQ3MTcyN30.InQ6X-xswIOwIpvq1fbwLBU2ZdCABUC0temYWOki7Ro',
                    'type': 'institute'
                },
                data: details
            };
            response = await axios(config);

            console.log(response);
            router.push("/explore");

        }
        catch (err) {

            console.log(err, "error here");
        }
        setloading(false);
    }

    return <>
        <SideNavLayout
            activeTab="newResource"
            pageHeader="Add New Resource"
        >
            <form onSubmit={submitHandler}>
                <div className={`${styles.input}`}>
                    <div className={`${styles.row}`}>
                        <InputBox
                            inputType="text"
                            label="Name of Resource"
                            value={resourceName}
                            name="resourceName"
                            width="60vw"
                            changeHandler={inputHandler}
                        />
                    </div>
                    <div className={`${styles.row}`}>
                        <InputBox
                            inputType="textarea"
                            label="Description"
                            value={description}
                            name="description"
                            width="60vw"
                            height="30vh"
                            changeHandler={inputHandler}
                        />
                    </div>
                    <div className={`${styles.row}`}>
                        <div>
                            <div className={`${styles.uploadResourceWidget}`}>
                                {/* <DnD
                                    onDrop={fileHandler}
                                    accept={".doc,.pdf,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document/*"}
                                /> */}
                                <label className={`${styles.label}`}>
                                    <input type="file" onChange={fileHandler} required className={`${styles.resourceChoose}`} />
                                    Choose Resource
                                </label>
                                <div className={`${styles.info}`} >
                                    <p >File Name: <span className={`${styles.fileDetails}`}> {resourceFileName == "" ? "          -" : resourceFileName}</span></p>
                                    <p >File Size: <span className={`${styles.fileDetails}`}> {resourceFileSize == "" ? "          -" : `${resourceFileSize} B`}</span></p>
                                </div>
                                <div className={`${styles.resourceUpload}`} onClick={fileUploadHandler}>
                                    Confirm & Upload Resource
                                </div>
                                {
                                    hash == '' ?
                                        " "
                                        :
                                        <p style={{ color: "#20b51b" }} > Files Encrypted</p>
                                }
                            </div>
                        </div>
                        <div className={`${styles.rowSecondItem}`}>
                            <div className={`${styles.categoriesLabel}`}>Upload thumbnail</div>
                            <div className={`${styles.dnd}`}>
                                {imgLink ?
                                    <div>
                                        <button type="button" onClick={() => { setImgLink(null) }} class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                            <Icon icon="akar-icons:cross" />
                                        </button>
                                        <img src={imgLink} />
                                    </div>
                                    : <ImageDnD
                                        onDrop={onDrop}
                                        accept={"image/*"}
                                    />
                                }

                            </div>
                        </div>
                    </div>
                    <div className={`${styles.row}`}>
                        <InputBox
                            inputType="text"
                            label="Contributor Wallet ID (Optional)"
                            value={recipient}
                            name="recipient"
                            width="60vw"
                            changeHandler={inputHandler}
                        />
                    </div>
                    <div className={`${styles.row}`}>
                        <InputBox
                            inputType="number"
                            label="Premium Amount Value (Any amount entered will be compensated to the Contributor)"
                            value={amount}
                            name="amount"
                            width="60vw"
                            changeHandler={inputHandler}
                        />
                    </div>
                </div>
                <div className={`${styles.uploadBtn}`} onClick={(e) => {
                    e.preventDefault;
                    submitHandler();
                }}>
                    <FloatingButton
                        btnText="Upload"
                    />
                </div>
                <div className={`${styles.message}`}>
                    <Message success header={msg.header} content={msg.message} />
                </div>


            </form>

        </SideNavLayout>
    </>
}
export async function getServerSideProps(context) {
    //  Runs only on the server. and works for every incoming request
    //   //should be used whe we need req,res or if we want to regenerate page multiple times
    // console.log(context);
    try {
        const address = context.params.address;
        console.log(address);
        const campaign = Resource(address);
        const details = await campaign.methods.getHeiDetails().call();
        const {
            0: mc, // minimumContribution
            1: fc, // file count
            2: uc, // userCount
            3: ma  // managerAddress
        } = details;
        console.log("this address : " + address);
        return {
            props: { mc, fc, uc, ma, address } // ca = Contract Address;
        }
    } catch (err) {
        return { props: err };
    }


}
export default NewRequest;



//ex hash= 'QmWFYNFH2KFarrrGoDx7GaAB5RN7MX3z1qWFTfUm7Pzd4o'
 //ex url: https://ipfs.infura.io/ipfs/${hash}

 //for this project
 //+-+${hash}