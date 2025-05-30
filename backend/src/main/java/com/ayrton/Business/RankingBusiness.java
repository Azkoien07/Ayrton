package com.ayrton.Business;

import com.ayrton.Services.RankingServices;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RankingBusiness {
    @Autowired
    private final RankingServices rankingservices;
    private final ModelMapper modelMapper = new ModelMapper();

    public RankingBusiness(RankingServices rankingservices) {
        this.rankingservices = rankingservices;
    }
}
