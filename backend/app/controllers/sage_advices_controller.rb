class SageAdvicesController < ApplicationController
def create
    sage_advice = SageAdvice.create(user_id: params[:user_id], source: params[:source], content: params[:content])
    render :json => sage_advice
end
def destroy
    sage_advice = SageAdvice.find(params[:id])
    sage_advice.destroy
    render :json => sage_advice
end
end
