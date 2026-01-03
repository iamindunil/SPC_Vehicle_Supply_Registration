package com.example.Indunil.rentvehicle_vehicleservice.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import java.util.List;

public class CabCompanyUpdateRequest {

    @Size(max = 255)
    private String name;

    @Size(max = 100)
    private String registrationNo;

    @Size(max = 2000)
    private String address;

    @Size(max = 255)
    private String contactPerson;

    private List<String> phoneNumbers;

    @Email
    private String email;

    @Size(max = 1000)
    private String remarks;

    private String licenseStatus;

    private Boolean active;

    private List<RentContractDto> contracts;

    // Getters & Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getRegistrationNo() { return registrationNo; }
    public void setRegistrationNo(String registrationNo) { this.registrationNo = registrationNo; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getContactPerson() { return contactPerson; }
    public void setContactPerson(String contactPerson) { this.contactPerson = contactPerson; }

    public List<String> getPhoneNumbers() { return phoneNumbers; }
    public void setPhoneNumbers(List<String> phoneNumbers) { this.phoneNumbers = phoneNumbers; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getRemarks() { return remarks; }
    public void setRemarks(String remarks) { this.remarks = remarks; }

    public String getLicenseStatus() { return licenseStatus; }
    public void setLicenseStatus(String licenseStatus) { this.licenseStatus = licenseStatus; }

    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }

    public List<RentContractDto> getContracts() { return contracts; }
    public void setContracts(List<RentContractDto> contracts) { this.contracts = contracts; }
}
