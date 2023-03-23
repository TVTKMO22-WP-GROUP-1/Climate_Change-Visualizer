package com.group1.climate_change_visualizer.Data;

import java.util.List;
import java.util.ArrayList;


public class DataService {

    private List<Data> data;

    public DataService(){
        data = new ArrayList<>();
    }

    public Data getData(String dataName, String dataValue){
        for (Data data : data){
            if (data.getDataName() == dataName){
                return data;
            }
        }
        return null;
    }  

    public List<Data> getData(){
        return this.data;
    }

    public void addData(String dataName, String dataValue){
        Data data = new Data(dataName, dataValue);
        this.data.add(data);
    }
}
