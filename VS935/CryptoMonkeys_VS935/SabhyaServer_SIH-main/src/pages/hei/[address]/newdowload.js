import { Form, Container, Button, Input, Message } from "semantic-ui-react";
import { useState } from "react";
import web3 from "../../../../ethereum/web3";
import Resource from "../../../../ethereum/resource";
import { create } from 'ipfs-http-client';
// import NewDownload from ".";

const NewRequest = (props) => {
    const { address } = props;
    const [Index, setIndex] = useState('');
    const [buffer, setbuffer] = useState(null);
    const [hash, sethash] = useState('');
    const [description, setdescription] = useState('');
    const [recipient, setrecipient] = useState('');
    const [loading, setloading] = useState(false)
    const [msg, setmsg] = useState({ header: '', message: '' });

    const projectId = '2DXMKunfP4sLPXiLF6fPNqFXxpA';   // <---------- your Infura Project ID

    const projectSecret = 'a9f17b8ee177ce48c933ab817c4e7f97';  // <---------- your Infura Secret
    // (for security concerns, consider saving these values in .env files)
    const inputHandler = (event) => {
        console.log(props,"props",event,"event")
        const { value, name } = event.target;
        if (name === "Index") setIndex(value);
        else if (name === "amount") setamount(value);
        else setrecipient(value);
    }

    const fileHashDownload  = async (event) => {
        try{
            console.log(typeof Index,"button clicked")
            const { address } = props;
            const campaign = Resource(address);
            const accounts = await web3.eth.getAccounts();
            console.log(campaign, "campaign");
            const hash1=await campaign.methods.contributeAndDownloadFile(Index).call({
                from: accounts[0],
                value: web3.utils.toWei('0.00000000000001', 'ether'),
            });
            console.log(hash1,"my hash");
        }catch(e){
            console.log(e,"error from download")
        }
    }
    const seeFileHash = async (event) => {
        event.preventDefault();
        try {
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
    return <>
        <Container textAlign="center" text>
            <Form
                style={{ marginTop: "5rem" }}
                //onSubmit={submitHandler}
                loading={loading}
                error={msg.header === 'Error'}
                success={msg.header === "Congratulations"}                >

                <Form.Field>
                    <label style={{ marginBottom: "4px" }} className="text-uppercase">
                        Enter Index
                    </label>
                    <Input
                        required
                        onChange={(e)=>{
                            inputHandler(e)
                        }}
                        value={Index}
                        name="Index"
                        icon="question circle"
                        iconPosition="left"
                        placeholder="Enter Index..."
                    />
                </Form.Field>
                <Button primary onClick={(e)=>{
                    fileHashDownload(e)
                }} >
                    VIEW HASH
                </Button>
                {/* <NewDownload address={address}/> */}
                <Message success header={msg.header} content={msg.message} />
                <Message error header={msg.header} content={msg.message} />
            </Form>
        </Container>
    </>
}
export async function getServerSideProps(ctx) {
    try {
        const address = ctx.params.address;
        return {
            props: { address }
        }
    } catch (err) {
        return { props: err };
    }
}

export default NewRequest;



//ex hash= 'QmWFYNFH2KFarrrGoDx7GaAB5RN7MX3z1qWFTfUm7Pzd4o'
 //ex url: https://ipfs.infura.io/ipfs/${hash}

 //for this project
 //https://sabhyaserver101.infura-ipfs.io/ipfs/${hash}