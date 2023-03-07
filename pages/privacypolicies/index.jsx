import React, { Fragment } from "react";
import Logo from "../../assets/TopBar/logo.svg";
import Link from "next/link";
import Head from "next/head";

const PrivacyPolicies = () => {
  return (
    <Fragment>
      <Head>
        <title>Moto Ghar - Privacy Policy</title>
      </Head>
      <div className="p-2 fixed shadow-md bg-customGray-light flex text-center items-center justify-between h-16 w-screen">
        <Link href="/" className="font-bold text-2xl text-primary">
          <Logo className="h-20 md:h-24" />
        </Link>
      </div>
      <div className="w-full h-full lg:px-36 md:px-20 pt-16">
        <h1 className="text-2xl font-semibold px-6 pt-6 pb-0">
          Privacy Policy
        </h1>
        <TermsAndConditionsPoints
          title="Introduction"
          desc="We are committed to protecting your privacy. This privacy
        policy describes the types of personal information we collect, how we
        use and protect that information, and your rights with respect to that
        information."
        />
        <TermsAndConditionsPoints
          title="What Personal Information We Collect"
          desc="We may collect the
        following types of personal information from you:"
        />
        <ul className="px-6">
          <ListItems item="a. Contact Information: We may collect your name, email address, phone number, and mailing address." />
          <ListItems item="b. Location Information: We may collect your location information through your IP address or other means." />
          <ListItems item="c. Usage Information: We may collect information about your use of our platform, including the type of device you use, the pages you visit, and the time and date of your visit." />
        </ul>
        <TermsAndConditionsPoints
          title="How We Use Your Personal Information"
          desc="We use your personal information for the following purposes:"
        />
        <ul className="px-6">
          <ListItems item="a. To provide you with the services you have requested;" />
          <ListItems item="b. To personalize your experience on our platform;" />
          <ListItems item="c. To process payments for our services;" />
          <ListItems item="d. To improve our platform and services;" />
          <ListItems item="e. To communicate with you about our platform and services;" />
          <ListItems item="f. To comply with legal and regulatory requirements." />
        </ul>
        <TermsAndConditionsPoints
          title="How We Protect Your Personal Information"
          desc="We take reasonable measures to protect your personal information from unauthorized access, use, and disclosure. We use industry-standard security measures such as encryption and firewalls to protect your personal information."
        />
        <TermsAndConditionsPoints
          title="Sharing Your Personal Information"
          desc="We may share your personal information with third parties in the following circumstances:"
        />
        <ul className="px-6">
          <ListItems item="a. With your consent;" />
          <ListItems item="b. To comply with legal and regulatory requirements;" />
          <ListItems item="c. To provide our services, such as payment processing;" />
          <ListItems item="d. To protect our rights and property, or the rights and property of others;" />
          <ListItems item="e. To enforce our terms and conditions;" />
          <ListItems item="f. To protect the safety of our users or the public." />
        </ul>
        <TermsAndConditionsPoints
          title="Your Rights"
          desc="You have the following rights with respect to your personal information:"
        />
        <ul className="px-6">
          <ListItems item="a. The right to access your personal information;" />
          <ListItems item="b. The right to correct your personal information;" />
          <ListItems item="c. The right to delete your personal information;" />
          <ListItems item="d. The right to restrict our use of your personal information;" />
          <ListItems item="e. The right to object to our use of your personal information." />
        </ul>
        <TermsAndConditionsPoints
          title="Changes to this Privacy Policy"
          desc="We reserve the right to update or modify this privacy policy at any time without prior notice. Any changes to this privacy policy will be posted on our platform."
        />

        <div className="pt-4 pb-8">
          <h2 className="px-6  text-lg font-medium">Contact Us</h2>
          <p className="text-md px-6">
            If you have any questions or concerns about this privacy policy,
            please contact us at info@motoghar.com.
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default PrivacyPolicies;

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
