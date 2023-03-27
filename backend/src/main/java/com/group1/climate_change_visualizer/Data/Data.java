package com.group1.climate_change_visualizer.Data;

import jakarta.persistence.*;

@Entity
@Table(name = "data")
public class Data {
    @Id
    private String dataName;
    private String dataValue;

    public Data() {
    }

    public Data(String dataName, String dataValue) {
        this.dataName = dataName;
        this.dataValue = dataValue;
    }

    public String getDataName() {
        return dataName;
    }

    public void setDataName(String dataName) {
        this.dataName = dataName;
    }

    public String getDataValue() {
        return dataValue;
    }

    public void setDataValue(String dataValue) {
        this.dataValue = dataValue;
    }
}
