package com.ayrton.Business;


import com.ayrton.Services.ChallengeServices;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChallengeBusiness {
    @Autowired
    private final ChallengeServices challengeServices;
    private final ModelMapper modelMapper = new ModelMapper();

    public ChallengeBusiness(ChallengeServices challengeServices) {
        this.challengeServices = challengeServices;
    }
}
