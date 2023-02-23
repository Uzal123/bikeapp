import React, { Fragment } from "react";
import TopBar from "../../components/Topbar/TopBar";

const TermsAndConditions = () => {
  return (
    <Fragment>
      <TopBar />
      <div className="w-full h-full lg:px-36 md:px-20 pb-8">
        <h1 className="text-2xl font-semibold px-6 pt-6 pb-0">
          Terms and Conditions
        </h1>
        <TermsAndConditionsPoints
          title="Introduction"
          desc="Welcome to our platform. By using our platform, you agree to be bound by these terms and conditions. If you do not agree with these terms and conditions, please do not use our platform."
        />
        <TermsAndConditionsPoints
          title="Use of the Platform"
          desc="By using our platform, you agree to:"
        />
        <ul className="px-6">
          <ListItems item="a. comply with all applicable laws and regulations;" />
          <ListItems item="b. provide accurate and complete information;" />
          <ListItems item="c. not engage in any prohibited activities;" />
          <ListItems item="d. not use our platform for any illegal or unauthorized purposes;" />
          <ListItems item="e. not infringe on any third-party rights;" />
          <ListItems item="f. not interfere with or disrupt the platform's functionality." />
        </ul>
        <TermsAndConditionsPoints
          title="Intellectual Property"
          desc="The Service and its content, including all text, graphics, logos, icons, images, and software, are the property of Wheelzhub or its licensors and are protected by copyright, trademark, and other intellectual property laws. You may not use the Service or its content for any commercial or illegal purpose without Wheelzhub's express written permission."
        />
        <TermsAndConditionsPoints
          title="Disclaimer of Warranties"
          desc="THE SERVICE IS PROVIDED 'AS IS' AND WITHOUT WARRANTY OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY. WHEELZHUB DISCLAIMS ALL WARRANTIES, INCLUDING WITHOUT LIMITATION ANY IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NONINFRINGEMENT. WHEELZHUB DOES NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE."
        />
        <TermsAndConditionsPoints
          title="Limitation of Liability"
          desc="IN NO EVENT WILL WHEELZHUB BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION DAMAGES FOR LOST PROFITS OR LOST DATA, ARISING OUT OF OR IN CONNECTION WITH THESE TERMS OR YOUR USE OF THE SERVICE, WHETHER BASED ON CONTRACT, TORT, STRICT LIABILITY, OR ANY OTHER LEGAL THEORY, EVEN IF WHEELZHUB HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES."
        />
        <TermsAndConditionsPoints
          title="Indemnification"
          desc="You agree to indemnify and hold Wheelzhub and its subsidiaries, affiliates, officers, agents, and other partners and employees, harmless from any loss, liability, claim, or demand, including reasonable attorneys' fees, made by any third party due to or arising out of your use of the Service, your violation of these Terms, or your violation of any rights of another."
        />
        <TermsAndConditionsPoints
          title="Termination"
          desc="We may terminate your access to the Service at any time, with or without cause, with or without notice, effective immediately. If you wish to terminate your account, you may do so by contacting us at support@wheelzhub.com  or by using the account settings in your account profile. All provisions of these Terms that by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability."
        />
        <TermsAndConditionsPoints
          title="Governing Law"
          desc="These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions. You and Wheelzhub agree to submit to the personal and exclusive jurisdiction of the courts located within the county of San Francisco, California."
        />
        <TermsAndConditionsPoints
          title="Changes to the Terms"
          desc="We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service."
        />
        <TermsAndConditionsPoints
          title="Contact Us"
          desc="If you have any questions about these Terms, please contact us at support@wheelzhub.com ."
        />
      </div>
    </Fragment>
  );
};

export default TermsAndConditions;

const TermsAndConditionsPoints = ({ title, desc }) => {
  return (
    <div className="pt-4">
      <h2 className="px-6  text-lg font-medium">{title}</h2>
      <p className="text-md px-6">{desc}</p>
    </div>
  );
};

const ListItems = ({ item }) => {
  return <li className="list-none">{item}</li>;
};
