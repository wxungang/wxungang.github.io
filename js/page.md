## 基于Zepto的传统页面逻辑功能模块化编码
- 删除了业务具体实现相关的代码。

~~~js
    var _userInfo = {};
    var _location = {};

    var _historyData;//最多十个
    var _cityCode;

    pageInit();

    function pageInit() {
        //接口事件
        getUserSearchHotWordData();
        inputSearch();
        searchByTypeData();
        searchByInput();
        //页面事件
        updateHistoryData();
        deleteRecentHistory();
        cancelInput();
        getLocation();
        searchDelete();
    }

    /**
     * 获取用户信息和位置信息
     */
    function getLocation() {
        up.busi.getLocation({
            callback: function (data, code, msg) {
                _location = data;
            }
        });

        setCityCode();

        if (up.isRunApp) {
            up.plugins.getUserInfo({
                callback: function (data, code, msg) {
                    if (100 === code) {
                        _userInfo.userId = data.userid;
                    }
                }
            })
            //@replaceStart 坑爹的环境
        } else {
            _userInfo.userId = '1104';
            //@replaceEnd
        }
    }

    /**
     * 获取
     * @param callback
     */
    function setCityCode(callback) {
        
    }

    /**
     * 删除历史数据
     */
    function deleteRecentHistory() {
        $("#recentSearch").on('click', '.delete', function (e) {
            $('#recentSearch').hide();
            //清空缓存数据
            _historyData = [];
            up.removeLocalStorage('historyData');
        });
    }

    /**
     * 获取 用户 热词
     */
    function getUserSearchHotWordData() {
        //获取热词数据
        up.busi.getLocation({
            callback: function (data, code, msg) {
                up.ajax({
                   //ajax 相关业务代码隐藏
                });
            }
        });


    }

    /**
     *根据选项值进行搜索(包含热词,历史搜索,自动补全数据)
     */
    function searchByTypeData() {
        var _options = {
            userId: _userInfo.userId,
            cityCd: _cityCode
        };

        /**
         *ajax
         * @private
         */
        function _TypeDataAjax() {
            up.ajax({
                //ajax 相关业务代码隐藏
            });
        }

        /**
         * getLocation
         * @private
         */
        function _searchByTypeData() {
            if (_location.latitude) {
                up.extend(_options, {lat: _location.latitude, lng: _location.longitude});
                _TypeDataAjax();
            } else {
                up.busi.getLocation({
                    callback: function (data, code, msg) {
                        _location = data;
                        up.extend(_options, {lat: _location.latitude, lng: _location.longitude});
                        _TypeDataAjax();
                    }
                })
            }

            // 1 or 4 对应于店铺和品牌，只需要id 就可以跳转到相应页面了。
            // 接口的调用只是为了后台记录
            if (_options.type == '01' || _options.type == '04') {
                setTimeout(function () {
                    showResult(data.result, _options.type, _options.id);
                }, 10);
            }

        }

        /**
         * _citycode
         * @private
         */
        function _cityCode() {
            setCityCode(function (data, code, msg) {
                if (100 === code) {
                    _options.cityCd = _cityCode = data.cityCode || data.cityCd;
                    _searchByTypeData();
                }
            });
        }

        //热词搜索
        $("#hotSearch").on('click', '.item', function (e) {
            var _data = $(this).attr('data');
            if (_data) {
                var _data = JSON.parse(_data || '{}');
                //更新历史记录
                updateHistoryData(_data);
                //调用接口数据
                up.extend(_options, _data);

                _cityCode();
            }
        });

        //历史记录
        $("#recentSearch").on('click', '.item', function (e) {
            var _data = $(this).attr('data');
            if (_data) {
                var _data = JSON.parse(_data || '{}');
                //更新历史记录
                updateHistoryData(_data);
                //调用接口数据
                up.extend(_options, _data);

                _cityCode();
            }
        });

        //自动补全的
        $("#searchMatch").on('click', '.shopItem', function (e) {
            var _data = $(this).attr('data');
            if (_data) {
                var _data = JSON.parse(_data || '{}');
                //更新历史记录
                updateHistoryData(_data);
                //调用接口数据
                up.extend(_options, _data);

                _cityCode();
            }
            //关闭自动补全 弹出层
            $(this).hide();
            //清除输入框数据
            $("#searchInput").val('');
        });
    }

    /**
     * 直接 通过输入词 搜索
     */
    function searchByInput() {
        $("#searchBtn").click(function () {
            var _inputValue = $("#searchInput").val().trim();
            if (!_inputValue) {
                return;
            }
            //新增 用户 历史数据
            updateHistoryData({value: _inputValue, type: '05'});

            //获取城市code信息，并调用后台数据
            setCityCode(function (data, code, msg) {
                if (100 === code) {
                    _cityCode = data.cityCode || data.cityCd;
                    _searchByInput(_inputValue, _cityCode);
                }
            })
        });
        /**
         *
         * @private
         */
        function _searchByInputAjax(inputValue, cityCode, location) {
            //获取 接口数据 并展示
            up.ajax({
                //ajax 相关业务代码隐藏
            })
        }

        function _searchByInput(inputValue, cityCode) {
            if (_location.latitude) {
                _searchByInputAjax(inputValue, cityCode, _location);
            } else {
                up.busi.getLocation({
                    callback: function (data, code, msg) {
                        _location = data;
                        _searchByInputAjax(inputValue, cityCode, _location);
                    }
                })
            }
        }
    }

    /**
     * 自动补全的 输入事件
     */
    function inputSearch() {
        $("#searchInput").on('input', function (e) {
            var _value = $(this).val().trim();
            console.log(_value);

            if (_value) {
                //删除按钮
                $(this).next().show();
                //搜索 取消
                $('#searchBtn').show().siblings('.searchBtn').hide();

                if (_location.latitude && _location.longitude) {
                    _getAutoCompleteData(_location, _value)
                } else {
                    up.busi.getLocation({
                        callback: function (data, code, msg) {
                            _location = data;
                            _getAutoCompleteData(_location, _value)
                        }
                    });
                }
            } else {
                //删除按钮
                $(this).next().hide();
                //搜索 取消
                $('#cancelBtn').show().siblings('.searchBtn').hide();
                //自动补全
                $("#searchMatch").hide();
            }

        });
        /**
         *
         * @param location
         * @param inputValue
         */
        function _getAutoCompleteData(location, inputValue) {
            up.ajax({
               //ajax 相关业务代码隐藏
            });
        }
    }

    /**
     * 根据不同 type 值 将查询的 结果放到不同 的页面展示
     * @param resultData ：查询的 数据
     * @param type 页面类型【品牌、店铺详情、一般关键词】
     * @param id brandNo 或者 shopNo
     */
    function showResult(resultData, type, id) {
        var _type = parseInt(type);
        if (_type == 1) {
            var s = "";
            window.location.href = s;
        }
        else if (type == 4) {
            var s = "";
            window.location.href = s;
        } else {
            window.location.href = "shop.html";

        }
    }


    /**
     * 获取 用户的历史记录并且展示出来
     */
    function updateHistoryData(data) {
        //data 来源：用户直接输入、自动补全的和历史搜索
        if (data) {
            _historyData = _historyData || [];
            _historyData = updateHistoryData(data);

            var _arrLength = _historyData.length;

            if (_arrLength > 10) {
                _historyData = _historyData.slice(_arrLength - 10);
            }
            //重新 缓存用户数据
            up.setLocalStorage('historyData', _historyData, true);
        } else {
            //页面 初始化时
            _historyData = JSON.parse(up.getLocalStorage('historyData') || '[]');
            //渲染 历史 数据
            $("#recentSearch").html(up.util.template($("#recentSearchTemplate").html(), {items: _historyData} || {}));
        }
        /**
         * 更新 历史 数据
         */
        function updateHistoryData(data) {
            // var _flag = true;//data 不存在
            for (var i = 0; i < _historyData.length; i++) {
                if (data.value === _historyData[i].value) {
                    //  _flag = false;
                    //存在则删除
                    _historyData.splice(i, 1);
                    break;
                }
            }
            //追加 新的 数据
            _historyData.push(data);
            //返回新的数组
            return _historyData;
        }
    }

    /**
     * 输入框中的 删除按钮
     */
    function searchDelete() {
        $('#searchDelete').click(function (e) {
            $('#searchInput').val('');
            //搜索 取消
            $('#cancelBtn').show().siblings('.searchBtn').hide();
            $(this).hide();

            //自动补全
            $("#searchMatch").hide();
        });
    }

    /**
     * 取消 按钮事件
     */
    function cancelInput() {
        //todo 强烈建议客户端 提供一个统一的 类似于 history.back();的功能
        if (history.length == 1) {
            //从客户端进来时 设置 state
            history.replaceState("search1104", 'search');
        }

        $('#cancelBtn').click(function (e) {
            if (history.state == 'search1104') {
                //关闭webview页面
            } else {
                history.back();
            }
        });
    }

    //没有结果时的展示
    function noResults() {
        var _template = '<div class="noResults">' + '<p>抱歉，暂时没有查到相关信息。</p>'
            + '<p>您可以重新输入，查看其他优惠信息。</p>'
            + '</div>';
        $('#searchMatch').html('').show();
    }
~~~