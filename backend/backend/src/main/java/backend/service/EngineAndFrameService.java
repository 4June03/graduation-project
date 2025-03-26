package backend.service;

import backend.entity.EngineAndFrame;

import java.util.List;
import java.util.Optional;

public interface EngineAndFrameService {
    public List<EngineAndFrame> findAll() ;

    public Optional<EngineAndFrame> findById(Integer id) ;

    public EngineAndFrame save(EngineAndFrame engineAndFrame) ;

    public EngineAndFrame update(EngineAndFrame engineAndFrame);

    public void deleteById(Integer id) ;

}
